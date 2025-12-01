import express from 'express';
import{ getAllUsers } from '../controllers/adminController.js'; 
import auth from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';  

const router = express.Router();


router.get(
  '/users',
  auth,           
  roleMiddleware(['admin']), 
  getAllUsers              
);

export default router;
