import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Parse cookies - middleware
app.use(cookieParser()); // allows use of request.cookies

// Accept JSON data in the body
app.use(express.json());
// Accept form data in the body
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// PayPal client ID
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Make the uploads folder static
const __dirname = path.resolve(); // get current directory name
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve the frontend build folder in production
if (process.env.NODE_ENV === 'production') {
  // Make the frontend build folder static
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // Serve the index.html file if we hit any route that is not an API route
  app.get('*', (req, res) => {
    // Send the index.html file
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  // If not in production, use the development build
  app.get('/', (req, res) => {
    res.send('API server is running');
  });
}



app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
} );
