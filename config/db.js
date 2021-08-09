import mongoose from "mongoose";
import config from "config";
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error : ${error.message}`.red.underline.bold);
    // Exit process with failure :
    process.exit(1);
  }
};

export default connectDB;
