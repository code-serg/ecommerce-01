import mongoose from "mongoose";

// reviewSchema will be a subdocument of productSchema
const reviewSchema = mongoose.Schema({
  // user who created the review
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // reference to the User model
    ref: 'User',
  },
  // what's this??  Title of the review?
  name: {
    type: String,
    required: true,
  },
  // rating will be a number that contains the rating of the product
  rating: {
    type: Number,
    required: true,
  },
  // comment will be a string that contains the comment of the product
  comment: {
    type: String,
    required: true,
  },
}, {
  // timestamps will automatically create a createdAt and updatedAt field
  timestamps: true,
});

// Define the productSchema
const productSchema = new mongoose.Schema({
  // user who created the product
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // reference to the User model
    ref: 'User',
  },
  // name will be a string that contains the name of the product
  name: {
    type: String,
    required: true,
  },
  // image will be a string that contains the path to the image
  image: {
    type: String,
    required: true,
  },
  // description will be a string that contains the description of the product
  description: {
    type: String,
    required: true,
  },
  // brand will be a string that contains the brand of the product
  brand: {
    type: String,
    required: true,
  },
  // category will be a string that contains the category of the product
  category: {
    type: String,
    required: true,
  },
  // price will be a number that contains the price of the product
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  // countInStock will be a number that contains the number of items in stock
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  // rating will be a number that contains the rating of the product
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  // numReviews will be a number that contains the number of reviews of the product
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  // timestamps will automatically create a createdAt and updatedAt field
  timestamps: true,
});

// Compile the model 'Product' from the schema 'productSchema'
const Product = mongoose.model('Product', productSchema);

export default Product;
