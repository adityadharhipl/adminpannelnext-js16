import express from "express";
import { myProfile, getAllUsers, adminSecretLogin, updateProfile } from "../controllers/userController.js";
import { auth } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";
import { changePassword } from "../controllers/userController.js";
import { uploadProfilePhoto } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/me", auth, myProfile);
router.get("/", auth, isAdmin, getAllUsers);
router.get("/secret-login/:userId", auth, isAdmin, adminSecretLogin);
router.put("/change-password", auth, changePassword);
router.put(
  "/update-profile",
  auth,
  uploadProfilePhoto.single("profilePhoto"),
  updateProfile
);


export default router;
