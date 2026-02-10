import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const dbConnection = await mongoose.connect(
      "mongodb://127.0.0.1:27017/myapp"
    );
    console.log(`MongoDB Connected Successfully`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
