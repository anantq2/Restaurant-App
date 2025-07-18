// dotenv is not needed for production on Render
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, './.env') });

import express from "express";
import { connectDB } from "./db/connectDB"; 

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());

// --- CORS Configuration ---
// This part is correct and allows your frontend to call the backend
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://restaurant-app-1-d8t4.onrender.com"
  ],
  credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// --- API Routes ---
// This is the main purpose of your backend
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);


// --- REMOVED STATIC FILE SERVING ---
// These lines were causing the crash and have been removed.
// The backend's job is not to serve the frontend files.
/*
app.use(express.static(path.join(DIRNAME,"/client/dist")));
app.use("*",(_,res) => {
    res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
});
*/

// --- Server Start ---
app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});
