"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryGenerate = RetryGenerate;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generative_ai_1 = require("@google/generative-ai");
const genAi = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
async function RetryGenerate(prompt, retries = 3) {
    const model = genAi.getGenerativeModel({
        model: "models/gemini-1.5-flash",
    });
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent(prompt);
            return result.response.text();
        }
        catch (err) {
            console.error(`Gemini error attempt ${i + 1}:`, err);
            if (i === retries - 1)
                throw err;
            await new Promise((r) => setTimeout(r, (i + 1) * 1000));
        }
    }
    throw new Error("Failed to generate content after retries");
}
