import mongoose from "mongoose"

const connectDB = async() => {
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/ecommerce");
        console.log(`MongoDB connected ${connection.connection.host}`);
    } catch (error){
        console.error("Error connecting MongoDB");
        process.setMaxListeners(1);
    }
};


export default connectDB;

