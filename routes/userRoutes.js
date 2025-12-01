// routes/userRoutes.js
import express from 'express';
import { getMyProfile } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', auth, getMyProfile);

export default router;
