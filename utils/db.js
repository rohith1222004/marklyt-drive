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
    await mongoose.connect('mongodb+srv://brohithkumar:9976188669@cluster0.2wl7tuh.mongodb.net/', {
      dbName: "MY_DB",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
