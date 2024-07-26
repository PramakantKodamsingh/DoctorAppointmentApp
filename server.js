import express from "express";
import compression from "compression";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

// dotenv config
dotenv.config();

// mongodb connect
connectDB();

// Initialize express
const app = express();

// Use compression middleware
app.use(compression());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

// Middlewares
app.use(express.json()); // Parses incoming JSON requests
app.use(morgan("dev")); // Logs HTTP requests

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

// Serve static files and handle SPA routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// Port
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  console.log(`Server Running in ${process.env.NODE_ENV}`.bgYellow.black);
});
