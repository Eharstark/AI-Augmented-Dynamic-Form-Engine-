/**
 * ============================================
 * Forma AI - Schema Utility Module
 * --------------------------------------------
 * Responsibilities:
 * 1. Validate incoming schema
 * 2. Normalize schema
 * 3. Analyze schema
 * 4. Generate AI-friendly schema summary
 * ============================================
 */

/**
 * --------------------------------------------
 * Validate Schema
 * --------------------------------------------
 */
export function validateSchema(schema) {
    const errors = [];

    if (!schema || typeof schema !== "object") {
        errors.push("Schema must be a valid object.");
        return {
            valid: false,
            errors,
        };
    }

    if (!Array.isArray(schema.fields)) {
        errors.push("Schema must contain a 'fields' array.");
        return {
            valid: false,
            errors,
        };
    }

    const ids = new Set();

    schema.fields.forEach((field, index) => {
        if (!field.id) {
            errors.push(`Field at index ${index} is missing an 'id'.`);
        }

        if (field.id && ids.has(field.id)) {
            errors.push(`Duplicate field id '${field.id}'.`);
        }

        ids.add(field.id);

        if (field.showIf) {
            Object.keys(field.showIf).forEach(parent => {
                if (!ids.has(parent) && !schema.fields.some(f => f.id === parent)) {
                    errors.push(
                        `Field '${field.id}' references unknown showIf field '${parent}'.`
                    );
                }
            });
        }
    });

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * --------------------------------------------
 * Normalize Schema
 * --------------------------------------------
 */
export function normalizeSchema(schema) {
    return {
        ...schema,
        formId: schema.formId || "unknown_form",
        fields: (schema.fields || []).map(field => ({
            id: field.id,
            label: field.label || field.id,
            type: field.type || "text",
            required: field.required ?? false,
            placeholder: field.placeholder || "",
            options: field.options || [],
            showIf: field.showIf || null,
            description: field.description || "",
            example: field.example || "",
        })),
    };
}

/**
 * --------------------------------------------
 * Get Field IDs
 * --------------------------------------------
 */
export function getFieldIds(schema) {
    return schema.fields.map(field => field.id);
}

/**
 * --------------------------------------------
 * Create Field Map
 * --------------------------------------------
 */
export function getFieldMap(schema) {
    return schema.fields.reduce((map, field) => {
        map[field.id] = field;
        return map;
    }, {});
}

/**
 * --------------------------------------------
 * Required Fields
 * --------------------------------------------
 */
export function getRequiredFields(schema) {
    return schema.fields.filter(field => field.required);
}

/**
 * --------------------------------------------
 * Optional Fields
 * --------------------------------------------
 */
export function getOptionalFields(schema) {
    return schema.fields.filter(field => !field.required);
}

/**
 * --------------------------------------------
 * Conditional Fields
 * --------------------------------------------
 */
export function getConditionalFields(schema) {
    return schema.fields.filter(field => field.showIf);
}

/**
 * --------------------------------------------
 * Schema Statistics
 * --------------------------------------------
 */
export function getFieldStatistics(schema) {
    const stats = {
        totalFields: schema.fields.length,
        requiredFields: 0,
        optionalFields: 0,
        conditionalFields: 0,
        fieldTypes: {},
    };

    schema.fields.forEach(field => {
        if (field.required) {
            stats.requiredFields++;
        } else {
            stats.optionalFields++;
        }

        if (field.showIf) {
            stats.conditionalFields++;
        }

        stats.fieldTypes[field.type] =
            (stats.fieldTypes[field.type] || 0) + 1;
    });

    return stats;
}

/**
 * --------------------------------------------
 * Generate AI-Friendly Schema Summary
 * --------------------------------------------
 */
export function summarizeSchema(schema) {
    const stats = getFieldStatistics(schema);

    let summary = `# Form Summary

Form ID: ${schema.formId}

Total Fields: ${stats.totalFields}
Required Fields: ${stats.requiredFields}
Optional Fields: ${stats.optionalFields}
Conditional Fields: ${stats.conditionalFields}

---

`;

    schema.fields.forEach((field, index) => {
        summary += `## Field ${index + 1}

ID: ${field.id}

Label: ${field.label}

Type: ${field.type}

Required: ${field.required ? "Yes" : "No"}
`;

        if (field.description) {
            summary += `
Description:
${field.description}
`;
        }

        if (field.example) {
            summary += `
Example:
${field.example}
`;
        }

        if (field.options.length) {
            summary += `
Allowed Values:
`;

            field.options.forEach(option => {
                if (typeof option === "object") {
                    summary += `- ${option.value} (${option.label})\n`;
                } else {
                    summary += `- ${option}\n`;
                }
            });
        }

        if (field.showIf) {
            summary += `
Visible When:
`;

            Object.entries(field.showIf).forEach(([key, value]) => {
                summary += `- ${key} = ${value}\n`;
            });
        }

        summary += `

--------------------------------------------

`;
    });

    return summary;
}