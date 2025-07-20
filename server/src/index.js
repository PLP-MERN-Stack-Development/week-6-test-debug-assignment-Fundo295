import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bugRoutes from './routes/bugRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bugs', bugRoutes);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });
