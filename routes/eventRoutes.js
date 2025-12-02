// routes/eventRoutes.js
import express from "express";
import * as ctrl from "../controllers/eventController.js";
import { requireAuth, requireAdmin ,auth} from "../middlewares/authMiddleware.js";


const router = express.Router();

// Public list & get (or make them authenticated if you prefer)
router.get("/", ctrl.listEvents);           // GET /api/events
router.get("/:id", ctrl.getEvent);          // GET /api/events/:id

// Admin operations
router.post("/", auth, ctrl.createEvent);        
router.patch("/:id", auth, ctrl.updateEvent);   
router.delete("/:id", auth, ctrl.deleteEvent);   
// router.post("/", requireAuth, requireAdmin, ctrl.createEvent);         // create event
// router.patch("/:id", requireAuth, requireAdmin, ctrl.updateEvent);    // partial update
// router.delete("/:id", requireAuth, requireAdmin, ctrl.deleteEvent);   // soft-delete

// Reservations (could be public/authenticated depending on app)
router.post("/:id/reserve", requireAuth, ctrl.reserveSeats);
router.post("/:id/release", requireAuth, ctrl.releaseSeats);

export default router;
