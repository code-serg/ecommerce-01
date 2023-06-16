import asyncHandler from '../middleware/asyncHandler.js'; // wrapper function - catches any errors and passes to the Express error handling middleware
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // findOne() is a mongoose method

  if (user && (await user.matchPassword(password))) { //is user in the db? and password matches? - matchPassword is a method in the user model
    generateToken(res, user._id);

    res.status(200).json({
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
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400); // 400 - bad request
    throw new Error('User already exists');
  } 

  // userSchema.pre('save' ... ) will hash the password before saving the user to the database - See userModel.js
  const user = await User.create({
    name,
    email,
    password,
  });

  // If user is created successfully...
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', { // clear cookie
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logout successful'});
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // req.user is set in the authUser middleware - see authMiddleware.js

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile // no need to specify the id. (The user is logged in and the token has all the info we need)
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // req.user is set in the authUser middleware - see authMiddleware.js

  if (user) {
    user.name = req.body.name || user.name; // if req.body.name is undefined, then use the existing user.name
    user.email = req.body.email || user.email;

    if (req.body.password) { // if the password is being updated
      user.password = req.body.password;
    }

    const updatedUser = await user.save(); // save the updated user to the database

    generateToken(res, updatedUser._id);

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
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