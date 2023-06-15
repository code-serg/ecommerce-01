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

const router = express.Router();

// /api/users - see backend/server.js
router.route('/').post(registerUser).get(getUsers); // getUsers -> use middleware to enforce admin role
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser); // use middleware to enforce admin role

export default router;