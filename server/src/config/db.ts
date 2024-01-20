import mongoose from "mongoose";
import env from "../util/validateEnv";

const connectDB =async()=>{
    try {
        const conn = await mongoose.connect(env.MONGO_URL);
        console.log(`Database connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`error ${error}`)
    }
}

export default connectDB;