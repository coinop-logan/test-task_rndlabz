import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoUser = process.env.MONGO_USER;
  const mongoPassword = process.env.MONGO_PASSWORD;
  const mongoUri = process.env.MONGO_URI;

  await mongoose.connect(`mongodb://${mongoUser}:${mongoPassword}@${mongoUri}`);
};

export default connectDB;
