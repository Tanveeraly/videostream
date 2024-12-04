import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {

    const dbconnection = await mongoose.connect(

      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Database is connected & DatabaseHost:${dbconnection.connection.host}`
    );
  } 
  catch (error) {

    console.error("Error while connecting to Database :", error);
    process.exit(1);
  }
};

export default connectDB;
