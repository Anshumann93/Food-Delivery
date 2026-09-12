import mongoose from "mongoose"

const connectDB = async()=>{
  try {
    const connectResponse = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`\n MongoDB connected !! DB HOST: ${connectResponse.connection.host}`);
  } catch (error) {
    console.log("The error is", error)
    process.exit(1)
  }
}

export default connectDB;
