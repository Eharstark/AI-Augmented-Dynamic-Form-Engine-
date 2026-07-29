# 🧠 Forma AI - LLM Extraction Service

An AI-powered microservice responsible for extracting structured data from unstructured text using Large Language Models (LLMs).

This service is part of the **Forma AI - AI-Augmented Dynamic Form Engine** internship project.

---

# 📌 Overview

The LLM Extraction Service receives:

- Unstructured user text
- A dynamic form schema

It uses an LLM to intelligently extract information and returns a clean JSON object that matches the provided schema.

Example:

Input Text:

```text
My name is Rahul.
I am 22 years old.
I live in Hyderabad.
```

Schema:

```json
{
  "formId": "user-info",
  "fields": [
    {
      "id": "name",
      "type": "text"
    },
    {
      "id": "age",
      "type": "number"
    },
    {
      "id": "city",
      "type": "text"
    }
  ]
}
```

Output:

```json
{
  "name": "Rahul",
  "age": 22,
  "city": "Hyderabad"
}
```

---

# 🚀 Features

- Dynamic schema-based extraction
- GPT-powered information extraction
- Schema validation
- Schema normalization
- Prompt engineering
- Response validation
- Modular architecture
- REST API
- Error handling
- Environment configuration

---

# 📁 Project Structure

```
llm-service/

├── src/
│
├── config/
│   └── openai.js
│
├── prompts/
│   └── extractionPrompt.js
│
├── routes/
│   └── extractRoute.js
│
├── services/
│   └── openaiService.js
│
├── utils/
│   ├── schemaHelper.js
│   ├── schemaUtils.js
│   └── validateResponse.js
│
├── extract.js
├── server.js
│
├── package.json
├── .gitignore
└── README.md
```

---

# ⚙️ Technology Stack

- Node.js
- Express.js
- OpenAI API
- JavaScript (ES Modules)

---

# 🏗 Architecture

```
                Client

                   │
                   ▼

          POST /extract

                   │
                   ▼

          Express Route

                   │
                   ▼

          extract.js

      ┌────────────┴────────────┐

      ▼                         ▼

Schema Validation        Schema Normalization

      │                         │

      └────────────┬────────────┘

                   ▼

          Prompt Builder

                   ▼

         OpenAI Service

                   ▼

           GPT Response

                   ▼

         Response Validation

                   ▼

            JSON Response
```

---

# 📦 Installation

Clone the repository

```bash
git clone <repository-url>
```

Go inside the project

```bash
cd llm-service
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
OPENAI_API_KEY=your_api_key_here
PORT=5001
```

---

# ▶️ Running the Server

```bash
npm start
```

or

```bash
node src/server.js
```

Server starts on

```
http://localhost:5001
```

---

# 📡 API

## Health Check

### Request

```
GET /
```

### Response

```json
{
  "service": "Forma AI LLM Service",
  "status": "running"
}
```

---

# Extract Endpoint

### Request

```
POST /extract
```

Headers

```
Content-Type: application/json
```

Request Body

```json
{
  "text": "My name is Rahul and I am 22 years old.",
  "schema": {
    "formId": "user-form",
    "fields": [
      {
        "id": "name",
        "type": "text"
      },
      {
        "id": "age",
        "type": "number"
      }
    ]
  }
}
```

Example Response

```json
{
  "name": "Rahul",
  "age": 22
}
```

---

# 📚 Workflow

1. Receive request
2. Validate schema
3. Normalize schema
4. Build extraction prompt
5. Send prompt to OpenAI
6. Parse GPT response
7. Validate extracted JSON
8. Return clean JSON response

---

# 📂 Module Responsibilities

## server.js

Starts the Express server and registers routes.

---

## extractRoute.js

Handles incoming API requests and returns responses.

---

## extract.js

Main orchestration layer responsible for the complete extraction workflow.

---

## schemaUtils.js

Provides:

- Schema validation
- Schema normalization
- Required field detection
- Conditional field detection
- Schema statistics
- Schema summary

---

## extractionPrompt.js

Generates a structured prompt for the language model using:

- User text
- Schema
- Schema summary
- Field statistics

---

## openaiService.js

Communicates with the OpenAI Responses API.

Responsibilities:

- Send prompt
- Receive response
- Return raw text

---

## validateResponse.js

Ensures the LLM response:

- Contains valid fields
- Matches schema
- Uses correct data types
- Removes invalid fields

---

# ⚠ Error Handling

The service handles:

- Invalid schema
- Missing request body
- Empty text
- Invalid JSON response
- OpenAI API errors
- Validation failures

---

# 🔒 Environment Variables

```
OPENAI_API_KEY
PORT
```

---

# 📝 Notes

- Requires a valid OpenAI API Key.
- The API key is never committed to Git.
- Store secrets inside `.env`.
- `.env` should be included in `.gitignore`.

---

# 👨‍💻 Author

Developed as part of the internship project:

**Forma AI - AI-Augmented Dynamic Form Engine**
