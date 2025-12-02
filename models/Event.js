// models/Event.js
import mongoose from "mongoose";

const PricingTierSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "earlybird", "regular", "vip"
  price: { type: Number, required: true, min: 0 },
  capacity: { type: Number, required: false }, // optional capacity for this tier
  startDate: { type: Date }, // optional validity window for tier
  endDate: { type: Date }
}, { _id: false });

const ExtraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  maxQuantityPerOrder: { type: Number, default: 1 }
}, { _id: false });

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: String,
  location: {
    name: String,
    address: String,
    lat: Number,
    lng: Number
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  capacity: { type: Number, required: true, min: 0 },
  capacityBooked: { type: Number, default: 0, min: 0 }, // seats already reserved
  pricing: { type: [PricingTierSchema], default: [] },
  extras: { type: [ExtraSchema], default: [] },
  published: { type: Boolean, default: false },
  metadata: { type: mongoose.Schema.Types.Mixed }, // free-form: tags, custom fields
  deleted: { type: Boolean, default: false }, // soft delete
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

// convenience virtual
EventSchema.virtual("availableSeats").get(function() {
  return Math.max(0, this.capacity - (this.capacityBooked || 0));
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
