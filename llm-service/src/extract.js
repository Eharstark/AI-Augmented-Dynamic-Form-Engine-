import {
    validateSchema,
    normalizeSchema,
    summarizeSchema,
    getFieldStatistics,
    getRequiredFields,
    getConditionalFields,
} from "./utils/schemaUtils.js";

import { buildExtractionPrompt } from "./prompts/extractionPrompt.js";
import { extractWithLLM } from "./services/openaiService.js";
import { validateResponse } from "./utils/validateResponse.js";

/**
 * ==========================================================
 * Forma AI - Extraction Orchestrator
 * ----------------------------------------------------------
 * Coordinates the complete extraction pipeline.
 * ==========================================================
 */

export async function extractData(text, schema) {
    // ---------------------------------------------
    // Step 1: Validate Schema
    // ---------------------------------------------
    const validation = validateSchema(schema);

    if (!validation.valid) {
        throw new Error(validation.errors.join("\n"));
    }

    // ---------------------------------------------
    // Step 2: Normalize Schema
    // ---------------------------------------------
    const normalizedSchema = normalizeSchema(schema);

    // ---------------------------------------------
    // Step 3: Build Schema Context
    // ---------------------------------------------
    const schemaContext = {
        summary: summarizeSchema(normalizedSchema),
        statistics: getFieldStatistics(normalizedSchema),
        requiredFields: getRequiredFields(normalizedSchema).map(
            (field) => field.id
        ),
        conditionalFields: getConditionalFields(normalizedSchema),
    };

    // ---------------------------------------------
    // Step 4: Build Extraction Prompt
    // ---------------------------------------------
    const prompt = buildExtractionPrompt({
        text,
        schema: normalizedSchema,
        schemaContext,
    });

    // ---------------------------------------------
    // Step 5: Call OpenAI
    // ---------------------------------------------
    const rawResponse = await extractWithLLM(prompt);

    // ---------------------------------------------
    // Step 6: Parse LLM Response
    // ---------------------------------------------
    let extractedData;

    try {
        extractedData = JSON.parse(rawResponse);
    } catch {
        throw new Error("LLM returned invalid JSON.");
    }

    // ---------------------------------------------
    // Step 7: Validate LLM Response
    // ---------------------------------------------
    const validatedResponse = validateResponse(
        extractedData,
        normalizedSchema
    );

    // ---------------------------------------------
    // Step 8: Return Validated Response
    // ---------------------------------------------
    return validatedResponse;
}