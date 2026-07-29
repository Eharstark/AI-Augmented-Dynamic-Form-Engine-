/**
 * ==========================================================
 * Forma AI - Response Validator
 * ----------------------------------------------------------
 * Validates the LLM response against the provided schema.
 * ==========================================================
 */

export function validateResponse(response, schema) {
    if (!response || typeof response !== "object" || Array.isArray(response)) {
        throw new Error("LLM response must be a JSON object.");
    }

    const fieldMap = new Map(
        schema.fields.map(field => [field.id, field])
    );

    const validatedResponse = {};

    for (const [key, value] of Object.entries(response)) {
        // ---------------------------------------------
        // Unknown Field
        // ---------------------------------------------
        const field = fieldMap.get(key);

        if (!field) {
            throw new Error(`Unknown field '${key}' returned by the LLM.`);
        }

        // ---------------------------------------------
        // Type Validation
        // ---------------------------------------------
        switch (field.type) {
            case "text":
            case "textarea":
                if (typeof value !== "string") {
                    throw new Error(`Field '${key}' must be a string.`);
                }
                break;

            case "number":
                if (typeof value !== "number") {
                    throw new Error(`Field '${key}' must be a number.`);
                }
                break;

            case "boolean":
            case "checkbox":
                if (typeof value !== "boolean") {
                    throw new Error(`Field '${key}' must be a boolean.`);
                }
                break;

            case "select":
            case "radio":
                if (
                    field.options &&
                    field.options.length > 0 &&
                    !field.options.includes(value)
                ) {
                    throw new Error(
                        `Invalid value '${value}' for field '${key}'.`
                    );
                }
                break;

            case "multiselect":
                if (!Array.isArray(value)) {
                    throw new Error(
                        `Field '${key}' must be an array.`
                    );
                }

                if (field.options?.length) {
                    for (const option of value) {
                        if (!field.options.includes(option)) {
                            throw new Error(
                                `Invalid option '${option}' for field '${key}'.`
                            );
                        }
                    }
                }
                break;

            default:
                // Unknown field types are accepted for now
                break;
        }

        // ---------------------------------------------
        // Conditional Field Validation
        // ---------------------------------------------
        if (field.showIf) {
            const [parentField, expectedValue] = Object.entries(field.showIf)[0];

            if (response[parentField] !== expectedValue) {
                throw new Error(
                    `Field '${key}' should not be present because condition '${parentField} = ${expectedValue}' is not satisfied.`
                );
            }
        }

        validatedResponse[key] = value;
    }

    return validatedResponse;
}