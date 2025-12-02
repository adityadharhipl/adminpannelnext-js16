import VehicleReview from "../models/VehicleReview.js";

// Exhibitor creates a vehicle
export const vehicleCreate = async (req, res) => {
  try {
    const vehicle = await VehicleReview.create({
      ...req.body,
      exhibitor: req.user.id
    });

    return res.json({ success: true, vehicle });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

export const getVehicleById = async (req, res) => {
    try {
        const vehicle = await VehicleReview.findById(req.params.id);
        res.json({ success: true, vehicle });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



export const GetAllvehicle = async (req, res) => {
    try {
        const vehicles = await VehicleReview.find({});   

        return res.json({ success: true, vehicles });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
// Admin: Get pending vehicles
export const getPendingVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleReview.find({ status: "pending" }).populate("exhibitor");
    return res.json({ success: true, vehicles });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Admin: Approve
export const approveVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleReview.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    return res.json({ success: true, vehicle });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Admin: Reject
export const rejectVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleReview.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        adminComment: req.body.comment || ""
      },
      { new: true }
    );

    return res.json({ success: true, vehicle });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// Admin: Request changes
export const requestChanges = async (req, res) => {
  try {
    const vehicle = await VehicleReview.findByIdAndUpdate(
      req.params.id,
      {
        status: "needs_changes",
        adminComment: req.body.comment
      },
      { new: true }
    );

    return res.json({ success: true, vehicle });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
