import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to Mongodb Database Server...");
    const res = await mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Mongodb is connected with the server ${res.connection.host} ....`
    );
  } catch (err) {
    console.log("Mongodb connection failed !!");
    console.log(err);
  }
};
