import express from 'express';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/userController.js';
import { authUser, authAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// /api/users - see backend/server.js
router.route('/').post(registerUser).get(authUser, authAdmin, getUsers); // getUsers -> use middleware to enforce admin role
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(authUser, getUserProfile).put(authUser, updateUserProfile);
router.route('/:id').get(authUser, authAdmin, getUserById).put(authUser, authAdmin, updateUser).delete(authUser, authAdmin, deleteUser); // enforce admin role

export default router;