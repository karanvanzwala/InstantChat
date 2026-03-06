import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
    try {

        const { MONGO_URI } = ENV
        if (!MONGO_URI) throw new Error("MONGO_URL is not set")
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log("MongoDB connected", conn.connection.host);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;