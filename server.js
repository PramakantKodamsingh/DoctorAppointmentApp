import express from "express";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import doctorRoutes from "./routes/doctorRoutes.js";
import { registerController } from "./controllers/userCtrl.js";

// dotenv config
dotenv.config();

// mongodb connect
connectDB();

// rest object
const app = express(); //  is a middleware in Express.js that parses incoming requests with JSON payloads.
//The express.json() middleware parses incoming JSON requests and puts the parsed data in req.body

//middlewares
app.use(express.json()); //parses req.body

app.use(morgan("dev"));
app.use(cors());
//routes

app.use("/api/v1/users", userRoutes);
// app.post('/register',registerController)

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

// port
const port = process.env.PORT || 8080;

// listen port
app.listen(port, () => {
  console.log(`Server Running in ${process.env.NODE_ENV}`.bgYellow.black);
});
