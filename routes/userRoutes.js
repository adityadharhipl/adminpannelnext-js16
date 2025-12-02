import express from "express";
import { myProfile, getAllUsers, adminSecretLogin } from "../controllers/userController.js";
import { auth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/me", auth, myProfile);
router.get("/", auth, isAdmin, getAllUsers);
router.get("/secret-login/:userId", auth, isAdmin, adminSecretLogin);

export default router;
