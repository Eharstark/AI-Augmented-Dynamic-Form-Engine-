import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import extractRoute from "./routes/extractRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ---------------------------------------------
// Health Check
// ---------------------------------------------
app.get("/", (req, res) => {
    res.status(200).json({
        service: "Forma AI LLM Service",
        status: "running",
    });
});

// ---------------------------------------------
// API Routes
// ---------------------------------------------
app.use("/extract", extractRoute);

// ---------------------------------------------
// Start Server
// ---------------------------------------------
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`🚀 Forma AI LLM Service running on port ${PORT}`);
});