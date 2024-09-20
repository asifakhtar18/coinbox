import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/coinbox";

export const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(dbUri);
    if (conn) console.log("connected to db");
  } catch (error) {
    console.log(
      "##################################################################"
    );
    console.log(" failed to connect to db", error);
    console.log(
      "##################################################################"
    );
  }
};
