// Express error handling middleware
// Middleware function for handling "Not Found" errors - pass any errors to the Express error handling middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  // Set the error status to 404 (not found)
  res.status(404);
  // Pass the error to the next middleware
  next(error);
}

// Middleware function for handling errors
const errorHandler = (err, req, res, next) => {
  // Set the error status to 500 (internal server error) if the status code is not already set
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for Mongoose ObjectId error
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Resource not found';
    statusCode = 404;
  }

  // Return the error message in the response
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞'  : err.stack
  });
}

export { notFound, errorHandler };