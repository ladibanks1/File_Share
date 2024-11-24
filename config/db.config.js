import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected To Database");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToDatabase;
