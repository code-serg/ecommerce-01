import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear out all existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert all users
    const createdUsers = await User.insertMany(users);

    // Get the admin user id
    const adminUser = createdUsers[0]._id;

    // Get all products and add the admin user to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert all products
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    // Clear out all existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);

    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

// Run the seeder from the command line - using scripts in package.json
// If the first argument is '-d', destroy the data ('node backend/seeder -d')
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}