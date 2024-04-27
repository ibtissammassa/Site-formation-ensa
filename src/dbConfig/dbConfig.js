import mongoose from "mongoose";

// this function will be used whenever we want to connect to mongodb
// since next js is a "edge run framework" it doesn't keep the database connection open
export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;
    //fire the callback when the connection is set "connected event"
    connection.on("connected", () => {
      console.log("MongoDB connected successfully.");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running." + err
      );
    });
  } catch (error) {
    console.log("Somthing went wrong when connecting to database.");
    console.log(error);
  }
}
