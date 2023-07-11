import asyncHandler from "../middleware/asyncHandler.js"; // wrapper function - catches any errors and passes to the Express error handling middleware
import Order from "../models/orderModel.js"
;

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('addOrderItems');
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('getOrders');
});

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('getMyOrders');
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send('getOrderById');
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('updateOrderToPaid');
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('updateOrderToDelivered');
});



export { 
  addOrderItems, 
  getMyOrders, 
  getOrderById, 
  updateOrderToPaid, 
  updateOrderToDelivered, 
  getOrders,
};