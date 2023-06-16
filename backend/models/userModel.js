import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false, // default value is false
  },
}, {
  // timestamps will add the createdAt and updatedAt fields automatically
  timestamps: true,
});

// Add method to the userSchema to compare the entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Define a mongoose model named 'User' using the 'userSchema'
const User = mongoose.model('User', userSchema);

export default User;