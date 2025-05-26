import mongoose from "mongoose";
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../a.env') });

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME, 

    });
    console.log("connected to db ")
  } catch (e) {
    console.log("error in db connection");
    process.exit(0);
  }
}

export default dbConnect
