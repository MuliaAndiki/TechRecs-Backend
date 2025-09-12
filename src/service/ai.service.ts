import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function RetryGenerate(
  prompt: string,
  retries = 3
): Promise<string> {
  const model = genAi.getGenerativeModel({
    model: "models/gemini-1.5-flash",
  });

  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.error(`Gemini error attempt ${i + 1}:`, err);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, (i + 1) * 1000));
    }
  }

  throw new Error("Failed to generate content after retries");
}
