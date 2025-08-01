import mongoose from 'mongoose';
import configKeys from '../../config';
import mongodbLogger from '../../logging/loggers/mongodbLogger';
mongoose.set('strictQuery', true);

const connectMongo = async () => {
  try {
    await mongoose.connect(configKeys.MONGO_DB_URL!);
    mongodbLogger.info('✅ MongoDB connected');
  } catch (err) {
    mongodbLogger.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectMongo;
