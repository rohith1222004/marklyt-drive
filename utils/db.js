import mongoose from "mongoose";

// Track the connection
let isConnected = false;

export const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "MY_DB",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
