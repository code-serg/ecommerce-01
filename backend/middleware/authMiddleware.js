import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes
const authUser = asyncHandler(async (req, res, next) => {
  let token;
  // Read the JWT from the cookie
  token = req.cookies.jwt // we called the token 'jwt' - see userController.js

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select('-password'); // select everything except the password, set the user to the request object
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


// Check if user is an admin
const authAdmin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401); // unauthorized
    throw new Error('Not authorized as an admin');
  }
}

export { authUser, authAdmin }; // use these middleware in the routes that need such protecting