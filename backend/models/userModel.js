import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // name will be a string that contains the name of the user
  name: {
    type: String,
    required: true,
  },
  // email will be a string that contains the email of the user
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // password will be a string that contains the password of the user
  password: {
    type: String,
    required: true,
  },
  // isAdmin will be a boolean that contains whether the user is an admin or not
  isAdmin: {
    type: Boolean,
    required: true,
    default: false, // default value is false
  },
}, {
  // timestamps will add the createdAt and updatedAt fields automatically
  timestamps: true,
});

// Define the User model
const User = mongoose.model('User', userSchema);

export default User;