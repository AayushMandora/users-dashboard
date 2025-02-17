import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { userRouter } from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

mongoose
  .connect("mongodb://localhost:27017/user-management")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
