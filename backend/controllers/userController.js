import asyncHandler from '../middleware/asyncHandler.js'; // wrapper function - catches any errors and passes to the Express error handling middleware
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('login user');
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