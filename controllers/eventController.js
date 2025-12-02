// controllers/eventController.js
import Event from "../models/Event.js";
import { createEventSchema, updateEventSchema } from "../validations/eventValidator.js";

export const createEvent = async (req, res) => {
  try {
    const payload = await createEventSchema.validateAsync(req.body, { stripUnknown: true });
    payload.createdBy = req.user?.id || null;
    const event = await Event.create(payload);
    return res.status(201).json({ success: true, data: event });
  } catch (err) {
    if (err.isJoi) return res.status(400).json({ success: false, error: err.message });
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = await updateEventSchema.validateAsync(req.body, { stripUnknown: true });

    const event = await Event.findOneAndUpdate(
      { _id: id, deleted: false },
      { $set: payload },
      { new: true }
    );
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });
    return res.json({ success: true, data: event });
  } catch (err) {
    if (err.isJoi) return res.status(400).json({ success: false, error: err.message });
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id, deleted: false });
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });
    return res.json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const listEvents = async (req, res) => {
  try {
    const { page = 1, limit = 20, q, published } = req.query;
    const filter = { deleted: false };
    if (published !== undefined) filter.published = published === "true";
    if (q) filter.$text = { $search: q }; // optional: requires text index

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Event.find(filter).sort({ startDate: 1 }).skip(skip).limit(Number(limit)),
      Event.countDocuments(filter)
    ]);
    return res.json({
      success: true,
      data: items,
      meta: { page: Number(page), limit: Number(limit), total }
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOneAndUpdate({ _id: id }, { $set: { deleted: true } }, { new: true });
    return res.json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

/* Extra helpers */

// Reserve seats
export const reserveSeats = async (req, res) => {
  try {
    const { id } = req.params;
    const { seats = 1 } = req.body;
    if (!Number.isInteger(seats) || seats <= 0) {
      return res.status(400).json({ success: false, error: "Invalid seats number" });
    }

    // Atomic update: only if capacityBooked + seats <= capacity
    const event = await Event.findOneAndUpdate(
      { _id: id, deleted: false, $expr: { $lte: [ { $add: ["$capacityBooked", seats] }, "$capacity" ] } },
      { $inc: { capacityBooked: seats } },
      { new: true }
    );

    if (!event) return res.status(409).json({ success: false, error: "Not enough seats available" });
    return res.json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Release seats (e.g., cancel)
export const releaseSeats = async (req, res) => {
  try {
    const { id } = req.params;
    const { seats = 1 } = req.body;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ success: false, error: "Event not found" });
    event.capacityBooked = Math.max(0, event.capacityBooked - seats);
    await event.save();
    return res.json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
