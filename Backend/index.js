import express from "express";
import router from "./router.js";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 8000;
dotenv.config();
app.use(express.json());
app.use(cors());

// database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

app.use("/api",router);



app.listen(port, () => {
    connect();
    console.log("server listening on port", port);
  });