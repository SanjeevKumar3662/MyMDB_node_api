import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;
import { DB_NAME } from "../utils/constants.js";

let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) {
      console.log("Already connected to db");
      return;
    }

    const db = await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    isConnected = db.connection.readyState === 1;
    console.log("Db connection established");
  } catch (error) {
    console.error(error);
  }
};
