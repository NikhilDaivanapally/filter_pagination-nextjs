import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }
  if (connectionState === 2) {
    console.log("connecting...");
    return;
  }
  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: "nextjs_restapi",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (error: any) {
    console.log("Error", error);
    throw new Error("Error", error);
  }
};

export default connectDB;
