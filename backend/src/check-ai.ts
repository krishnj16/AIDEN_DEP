// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// async function listModels() {
//   try {
//     console.log("Checking available models...");
//     // This will list every model your Key is allowed to touch
//     const response = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
//     console.log("Success! Connected to gemini-1.5-flash");
//   } catch (error: any) {
//     console.error("Error connecting:", error.message);
//     console.log("\n--- TRYING TO LIST ALL MODELS ---");
//     // Fallback: Manually list models (some SDK versions require a different call, but let's try this)
//     console.log("Please ensure your API Key is from: https://aistudio.google.com/app/apikey");
//   }
// }

// listModels();