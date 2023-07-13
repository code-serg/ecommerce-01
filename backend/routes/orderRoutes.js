import express from 'express';
import { 
  addOrderItems, 
  getMyOrders, 
  getOrderById, 
  updateOrderToPaid, 
  updateOrderToDelivered, 
  getOrders,
} from '../controllers/orderController.js';
import { authUser, authAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// /api/users - see backend/server.js
router.route('/').post(authUser, addOrderItems).get(authUser, authAdmin, getOrders); // getOrders -> use middleware to enforce admin role
router.route('/myorders').get(authUser, getMyOrders);
router.route('/:id').get(authUser, authAdmin, getOrderById);
router.route('/:id/pay').put(authUser, updateOrderToPaid);
router.route('/:id/deliver').put(authUser,authAdmin, updateOrderToDelivered);

export default router;