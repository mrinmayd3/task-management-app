import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log("DB connected:", connect.connection.name);
  } catch (error) {
    console.log(error);
  }
};
