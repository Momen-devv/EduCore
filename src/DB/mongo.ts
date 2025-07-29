import mongoose from 'mongoose';
import configKeys from '../config';

export const connectMongo = async () => {
  try {
    await mongoose.connect(configKeys.MONGO_DB_URL!);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};
