import openai from "../config/openai.js";

/**
 * ==========================================================
 * Forma AI - OpenAI Service
 * ----------------------------------------------------------
 * Sends the extraction prompt to OpenAI and returns
 * the generated response.
 * ==========================================================
 */

export async function extractWithLLM(prompt) {
    try {
        const response = await openai.responses.create({
            model: "gpt-5.5",
            input: prompt,
            temperature: 0,
        });

        return response.output_text.trim();

    } catch (error) {
        console.error("OpenAI Extraction Error:", error);

        throw new Error(
            `Failed to extract information using OpenAI: ${error.message}`
        );
    }
}