import express from "express";
import { extractData } from "../extract.js";

const router = express.Router();

/**
 * ==========================================================
 * Forma AI - Extraction Route
 * ----------------------------------------------------------
 * POST /extract
 * ==========================================================
 */

router.post("/", async (req, res) => {
    try {
        const { text, schema } = req.body;

        // ---------------------------------------------
        // Basic Request Validation
        // ---------------------------------------------
        if (!text || typeof text !== "string") {
            return res.status(400).json({
                error: "Request must include a valid 'text' field.",
            });
        }

        if (!schema || typeof schema !== "object") {
            return res.status(400).json({
                error: "Request must include a valid 'schema' object.",
            });
        }

        // ---------------------------------------------
        // Run Extraction Pipeline
        // ---------------------------------------------
        const extractedData = await extractData(text, schema);

        // ---------------------------------------------
        // Success Response
        // ---------------------------------------------
        return res.status(200).json(extractedData);

    } catch (error) {
        console.error("Extraction Error:", error);

        return res.status(500).json({
            error: error.message || "Internal Server Error",
        });
    }
});

export default router;