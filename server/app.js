import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import taskRoutes from "./routes/task.js";
import userRoutes from "./routes/user.js";

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/users", userRoutes);

// Port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

// mrinmaydey48 A5Bt9nVMO5OurGSu
