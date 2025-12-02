// import express from "express";
// import {
//   vehicleCreate,
//   getPendingVehicles,
//   approveVehicle,
//   rejectVehicle,
//   requestChanges
// } from "../controllers/vehicleController.js";

// import { auth, adminOnly } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Exhibitor
// router.post("/vehicleCreate", auth, vehicleCreate);

// // Admin
// router.get("/pending", auth, adminOnly, getPendingVehicles);
// router.put("/approve/:id", auth, adminOnly, approveVehicle);
// router.put("/reject/:id", auth, adminOnly, rejectVehicle);
// router.put("/needs-changes/:id", auth, adminOnly, requestChanges);

// export default router;


import express from "express";
import {
  vehicleCreate,
  getPendingVehicles,
  approveVehicle,
  rejectVehicle,
  requestChanges,
  GetAllvehicle,
  getVehicleById
} from "../controllers/vehicleController.js";

import { auth } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.post("/vehicleCreate", auth, vehicleCreate);
router.get("/GetAllvehicle",auth,GetAllvehicle)
router.get("/getVehicleById/:id",auth,getVehicleById)
router.get("/pending", auth, getPendingVehicles);

export default router;
