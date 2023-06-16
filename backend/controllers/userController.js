import asyncHandler from '../middleware/asyncHandler.js'; // wrapper function - catches any errors and passes to the Express error handling middleware
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // findOne() is a mongoose method

  if (user && (await user.matchPassword(password))) { // in the db? and password matches?
    const token = jwt.sign({ // create a token
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, { expiresIn: '10d' }); 

    // Set JWT as HTTP-only cookie
    res.cookie('jwt', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // only send cookie over https if not in development
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 10 // 10 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401); // 401 - unauthorized
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user');
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('Get user profile');
});

// @desc    Update user profile
// @route   PUT /api/users/profile // no need to specify the id. (The user is logged in and the token has all the info we need)
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('Update user profile');
});

// @desc    Get all users
// @route   GET /api/users/
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('Get users');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send('Get user by id');
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('Update user');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete user');
});

export { loginUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, updateUser, deleteUser };