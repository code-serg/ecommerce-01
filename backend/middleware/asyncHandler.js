/*
 * This code defines an asynchronous error handling middleware function named `asyncHandler`.
 * It takes in a single parameter `fn`, which is expected to be an asynchronous function.
 *
 * The `asyncHandler` function itself is defined as a higher-order function, meaning it returns another function.
 * The returned function is the actual middleware function that will be executed when a request is made to the server.
 *
 * This middleware function takes three parameters: `req` (request), `res` (response), and `next` (a function to pass control to the next middleware function).
 * It is following the standard signature of an Express middleware function.
 *
 * Inside the middleware function, there is a `Promise.resolve()` call that wraps the invocation of `fn(req, res, next)`.
 * This is done to ensure that `fn` always returns a promise.
 * By using `Promise.resolve()`, it can handle both promise-based asynchronous functions and synchronous functions.
 *
 * The `Promise.resolve()` call is followed by `.catch(next)`,
 * which means if the promise is rejected (an error is thrown or the promise is explicitly rejected),
 * it will be caught and passed to the `next` function, which is the error handling middleware in Express.
 *
 * By using this `asyncHandler` middleware, any asynchronous function passed to it will have its errors automatically caught and passed to the Express error handling middleware,
 * allowing for centralized error handling in the application.
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;
