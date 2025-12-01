// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";


// dotenv.config();
// const app = express();

// app.use(cors());
// // app.use(express, express.json());
// app.use(express.json());



// import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'

// app.use("/api/auth/", authRoutes);
// app.use("/api/user/", userRoutes);
// app.use("/api/admin/", adminRoutes)

// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log("connected to db");

//   app.listen(3000, () => {
//     console.log(`Server running at 3000`);
//   });
// });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to DB");
  app.listen(process.env.PORT || 5000, () =>
    console.log("Server running")
  );
})
.catch((err) => console.log("DB Error:", err));

