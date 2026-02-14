import mongoose from "mongoose";
import dotenv from 'dotenv'
export async function dbConnect() {
  dotenv.config()

  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGO_URL
    ); 
     console.log(process.env.MONGO_URL)
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
