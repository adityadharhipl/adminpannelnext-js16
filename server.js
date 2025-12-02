import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js"
import vehicleRoutes from "./routes/vehicleReviewRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/vehicle", vehicleRoutes);



// app.listen(5001, () => console.log("Server running on 5000"));
  app.listen(process.env.PORT || 5001, () =>
    console.log("Server running on 5001")
  );
