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

// Add middleware to the userSchema to hash the password before saving the user to the database - 'pre'
userSchema.pre('save', async function (next) { 
  // if the password field is not modified, then move on to the next middleware
  if (!this.isModified('password')) {
    next();
  }

  // otherwise, hash the password
  const salt = await bcrypt.genSalt(10); // generate a salt with 10 rounds
  this.password = await bcrypt.hash(this.password, salt); // hash the password with the salt
});

// Define a mongoose model named 'User' using the 'userSchema'
const User = mongoose.model('User', userSchema);

export default User;