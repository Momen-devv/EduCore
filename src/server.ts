import app from './app';
import mongoose from 'mongoose';
import configKeys from './config';

const PORT = process.env.PORT || 3000;

mongoose
  .connect(configKeys.MONGO_DB_URL!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  })
  .catch((err) => console.error(err));
