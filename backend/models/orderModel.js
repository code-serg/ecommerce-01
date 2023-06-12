import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // user who created the order
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // reference to the User model
    ref: 'User',
  },
  // orderItems will be an array of objects that contains the order items
  orderItems: [
    {
      // name will be a string that contains the name of the product
      name: { type: String, required: true },
      // qty will be a number that contains the quantity of the product
      qty: { type: Number, required: true },
      // image will be a string that contains the path to the image
      image: { type: String, required: true },
      // price will be a number that contains the price of the product
      price: { type: Number, required: true },
      // product will be an object that contains the product
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // reference to the Product model
        ref: 'Product',
      },
    },
  ],
  // shippingAddress will be an object that contains the shipping address
  shippingAddress: {
    // address will be a string that contains the address
    address: { type: String, required: true },
    // city will be a string that contains the city
    city: { type: String, required: true },
    // postalCode will be a string that contains the postal code
    postalCode: { type: String, required: true },
    // country will be a string that contains the country
    country: { type: String, required: true },
  },
  // paymentMethod will be a string that contains the payment method
  paymentMethod: {
    type: String,
    required: true,
  },
  // paymentResult will be an object that contains the payment result
  paymentResult: {
    // id will be a string that contains the id
    id: { type: String },
    // status will be a string that contains the status
    status: { type: String },
    // update_time will be a string that contains the update time
    update_time: { type: String },
    // email_address will be a string that contains the email address
    email_address: { type: String },
  },
  // itemsPrice will be a number that contains the price of the order
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  // taxPrice will be a number that contains the tax price
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  // shippingPrice will be a number that contains the shipping price
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  // totalPrice will be a number that contains the total price
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  // isPaid will be a boolean that contains whether the order is paid or not
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  // paidAt will be a date that contains the date when the order is paid
  paidAt: {
    type: Date,
  },
  // isDelivered will be a boolean that contains whether the order is delivered or not
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  // deliveredAt will be a date that contains the date when the order is delivered
  deliveredAt: {
    type: Date,
  },
}, {
  // timestamps will add the createdAt and updatedAt fields automatically
  timestamps: true,
});

// Define the Order model
const Order = mongoose.model('Order', orderSchema);

export default Order;
