import asyncHandler from "../middleware/asyncHandler.js"; // wrapper function - catches any errors and passes to the Express error handling middleware
import Order from "../models/orderModel.js"
;

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400); // bad request
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item, // name, qty, image, price
        product: item._id, // product in the order is identified by the product id. Comes from the backend, not the frontend
        _id: undefined, // TODO - i don't fully understand this and the line above, yet
      })),
      user: req.user._id, // logged in user
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
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
  const orders = await Order.find({ user: req.user._id }); // logged in user

  res.status(200).json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email') // also, populate from the user collection - the name and email of the user

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404); // not found
    throw new Error('Order not found');
  }
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