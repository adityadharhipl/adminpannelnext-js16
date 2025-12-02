import mongoose from "mongoose";

const vehicleReviewSchema = new mongoose.Schema(
  {
    exhibitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    vehicleName: { type: String, required: true },
    vehicleType: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    images: [{ type: String }],

    // Status of review
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "needs_changes"],
      default: "pending"
    },

    adminComment: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("VehicleReview", vehicleReviewSchema);
