// import { GoogleGenerativeAI, Content } from "@google/generative-ai";
// import { PERSONAS } from "../config/personas";

// // Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// // ✅ FIX: Use 'gemini-1.5-flash' (It is faster and currently supported)
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// interface ChatMessage {
//   role: 'user' | 'assistant';
//   content: string;
// }

// export const generateAIResponse = async (
//   personaId: string, 
//   history: ChatMessage[], 
//   newMessage: string
// ): Promise<string> => {
//   try {
//     // 1. Find the Persona
//     const persona = PERSONAS.find(p => p.id === personaId);
//     if (!persona) throw new Error("Persona not found");

//     // 2. Format History
//     const formattedHistory: Content[] = history.map(msg => ({
//       role: msg.role === 'assistant' ? 'model' : 'user',
//       parts: [{ text: msg.content }],
//     }));

//     // 3. Start Chat
//     const chat = model.startChat({
//       history: formattedHistory,
//       systemInstruction: {
//         role: "system",
//         parts: [{ text: persona.systemPrompt || "You are a helpful AI." }]
//       }
//     });

//     // 4. Send Message
//     const result = await chat.sendMessage(newMessage);
//     const response = await result.response;
    
//     return response.text();

//   } catch (error) {
//     console.error("Gemini Error:", error);
//     return "I am having trouble connecting to my neural network. Please try again.";
//   }
// };


// export async function generateAIResponse(
//   personaId: string,
//   history: { role: 'user' | 'assistant'; content: string }[],
//   message: string
// ): Promise<string> {

//   const systemPrompt = `
// You are ${personaId}.
// You are intelligent, concise, and helpful.
// Respond clearly and professionally.
// `;

//   const messages = [
//     { role: 'system', content: systemPrompt },
//     ...history.map(h => ({
//       role: h.role === 'assistant' ? 'assistant' : 'user',
//       content: h.content
//     })),
//     { role: 'user', content: message }
//   ];

//   const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       'Content-Type': 'application/json',
//       'HTTP-Referer': 'http://localhost:3000',
//       'X-Title': 'AIDEN'
//     },
//     body: JSON.stringify({
//       model: 'openai/gpt-3.5-turbo',
//       messages,
//       temperature: 0.6
//     })
//   });

//   const data = await res.json();

//   console.log('OpenRouter raw response:', JSON.stringify(data, null, 2));

//   if (data.error) {
//     throw new Error(data.error.message || 'OpenRouter error');
//   }

//   const content =
//     data.choices?.[0]?.message?.content ??
//     data.choices?.[0]?.text;

//   if (!content) {
//     throw new Error('Invalid AI response');
//   }

//   return content;
// }





// import OpenAI from 'openai';
// import { PERSONAS } from "../config/personas";

// // Initialize OpenRouter (via OpenAI SDK)
// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1', 
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:8080',
//     'X-Title': 'AIDEN',
//   },
// });

// // Define Model IDs
// // Option A: The Cutting Edge (Free, Multimodal, Fast)
// const MODEL_PRIMARY = 'google/gemini-2.0-flash-exp:free';

// // Option B: The Stable Fallback (Cheap/Free, Reliable)
// // Use this if Option A stops working
// const MODEL_FALLBACK = 'google/gemini-flash-1.5'; 

// interface ChatMessage {
//   role: 'user' | 'assistant';
//   content: string; 
// }

// export const generateAIResponse = async (
//   personaId: string, 
//   history: ChatMessage[], 
//   newMessage: string
// ): Promise<string> => {
//   try {
//     const persona = PERSONAS.find(p => p.id === personaId);
//     if (!persona) throw new Error("Persona not found");

//     // 1. Prepare System Prompt
//     const systemMessage = { 
//       role: 'system', 
//       content: persona.systemPrompt || "You are a helpful AI." 
//     };

//     // 2. Format History
//     // (Ready for 'content' to be an array of text/images later)
//     const conversation = history.map(msg => ({ 
//       role: msg.role as 'user' | 'assistant', 
//       content: msg.content 
//     }));

//     // 3. Add User Message
//     const userMessage = { 
//       role: 'user', 
//       content: newMessage 
//     };

//     // 4. Send to OpenRouter
//     const completion = await openai.chat.completions.create({
//       model: MODEL_PRIMARY, 
//       messages: [systemMessage, ...conversation, userMessage] as any,
//     });

//     return completion.choices[0]?.message?.content || "I am currently offline.";

//   } catch (error) {
//     console.error("OpenRouter Error:", error);
//     return "I am having trouble processing that request. Please try again.";
//   }
// };

// import { PERSONAS } from '../config/personas';

// // Helper to make the actual API call
// async function callOpenRouter(model: string, messages: any[]) {
//   const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       'Content-Type': 'application/json',
//       'HTTP-Referer': 'http://localhost:3000',
//       'X-Title': 'AIDEN'
//     },
//     body: JSON.stringify({
//       model,
//       messages,
//       temperature: 0.7 
//     })
//   });

//   const data = await res.json();

//   if (data.error) {
//     throw new Error(data.error.message || 'OpenRouter error');
//   }

//   return data.choices?.[0]?.message?.content;
// }

// export async function generateAIResponse(
//   personaId: string,
//   history: { role: 'user' | 'assistant'; content: string }[],
//   message: string
// ): Promise<string> {

//   // 1. SETUP THE PERSONA
//   const persona = PERSONAS.find(p => p.id === personaId);
//   const systemInstruction = persona?.systemPrompt 
//     || `You are ${personaId}. Respond clearly and helpfully.`;

//   const messages = [
//     { role: 'system', content: systemInstruction },
//     ...history.map(h => ({
//       role: h.role === 'assistant' ? 'assistant' : 'user',
//       content: h.content
//     })),
//     { role: 'user', content: message }
//   ];

//   // 2. THE CASCADE (Triple Fallback System)
//   try {
//     // 🟢 OPTION A: The Best (Smart & Fast)
//     const reply = await callOpenRouter('openai/gpt-4o-mini', messages);
//     return `[4o-mini] ${reply}`; // 🏷️ Debug Tag

//   } catch (err1) {
//     console.warn(`[AI] Primary (4o-mini) failed: ${(err1 as Error).message}. Switching to Backup 1...`);

//     try {
//       // 🟡 OPTION B: The Classic (Reliable)
//       const reply = await callOpenRouter('openai/gpt-3.5-turbo', messages);
//       return `[3.5-turbo] ${reply}`; // 🏷️ Debug Tag

//     } catch (err2) {
//       console.warn(`[AI] Backup 1 (3.5) failed: ${(err2 as Error).message}. Switching to Safety Net...`);

//       try {
//         // 🔴 OPTION C: The Safety Net (Free & Open Source)
//         const reply = await callOpenRouter('meta-llama/llama-3-8b-instruct:free', messages);
//         return `[Llama-3] ${reply}`; // 🏷️ Debug Tag
        
//       } catch (err3) {
//         console.error('[AI] All models failed.', err3);
//         return "[SYSTEM ERROR] Critical: Unable to connect to any AI models.";
//       }
//     }
//   }
// }


// import { PERSONAS } from '../config/personas';

// // Helper to make the actual API call
// async function callOpenRouter(model: string, messages: any[]) {
//   const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       'Content-Type': 'application/json',
//       'HTTP-Referer': 'http://localhost:3000',
//       'X-Title': 'AIDEN'
//     },
//     body: JSON.stringify({
//       model,
//       messages,
//       temperature: 0.7 
//     })
//   });

//   const data = await res.json();

//   if (data.error) {
//     throw new Error(data.error.message || 'OpenRouter error');
//   }

//   return data.choices?.[0]?.message?.content;
// }

// export async function generateAIResponse(
//   personaId: string,
//   history: { role: 'user' | 'assistant'; content: string }[],
//   message: string,
//   imageUrl?: string // 👈 NEW: Optional Image
// ): Promise<string> {

//   const persona = PERSONAS.find(p => p.id === personaId);
//   const systemInstruction = persona?.systemPrompt 
//     || `You are ${personaId}. Respond clearly and helpfully.`;

//   // 1. Prepare Standard History (Text Only)
//   const historyFormatted = history.map(h => ({
//     role: h.role === 'assistant' ? 'assistant' : 'user',
//     content: h.content
//   }));

//   // 2. Prepare the "Multimodal" User Message
//   let userContent: any = message;
//   if (imageUrl) {
//     userContent = [
//       { type: "text", text: message },
//       { type: "image_url", image_url: { url: imageUrl } }
//     ];
//   }

//   // 3. Construct Messages Array (Multimodal version)
//   const messagesMultimodal = [
//     { role: 'system', content: systemInstruction },
//     ...historyFormatted,
//     { role: 'user', content: userContent }
//   ];

//   // 4. Construct Messages Array (Text-Only Fallback)
//   // We use this if the Primary fails, so we don't crash the text-only backups
//   const messagesTextOnly = [
//     { role: 'system', content: systemInstruction },
//     ...historyFormatted,
//     { role: 'user', content: message + (imageUrl ? " [Image attachment lost in fallback]" : "") }
//   ];

//   // 5. THE CASCADE
//   try {
//     // 🟢 OPTION A: GPT-4o-mini (Supports Images)
//     return await callOpenRouter('openai/gpt-4o-mini', messagesMultimodal);

//   } catch (err1) {
//     console.warn(`[AI] Primary (4o-mini) failed. Switching to Backup...`);

//     // ⚠️ CRITICAL: Switch to 'messagesTextOnly' for backups
//     try {
//       // 🟡 OPTION B: GPT-3.5 (Text Only)
//       return await callOpenRouter('openai/gpt-3.5-turbo', messagesTextOnly);

//     } catch (err2) {
//       console.warn(`[AI] Backup 1 (3.5) failed. Switching to Safety Net...`);

//       try {
//         // 🔴 OPTION C: Llama 3 (Text Only, Free)
//         return await callOpenRouter('meta-llama/llama-3-8b-instruct:free', messagesTextOnly);
        
//       } catch (err3) {
//         console.error('[AI] All models failed.', err3);
//         return "System Critical: Unable to connect to any AI models.";
//       }
//     }
//   }
// }
// import OpenAI from 'openai';
// import { PERSONAS } from "../config/personas";
// import { memoryService } from './memory.service'; // 👈 Import Memory

// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1', 
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000',
//     'X-Title': 'AIDEN',
//   },
// });

// // Helper to make the actual API call
// // async function callOpenRouter(model: string, messages: any[]) {
// //   const completion = await openai.chat.completions.create({
// //     model: model, 
// //     messages: messages,
// //   });
// //   return completion.choices[0]?.message?.content || "";
// // }

// // export const generateAIResponse = async (
// //   personaId: string, 
// //   history: { role: 'user' | 'assistant'; content: string }[], 
// //   message: string,
// //   userId: string, // 👈 NEW: We need to know WHO is asking to find THEIR memories
// //   imageUrl?: string 
// // ): Promise<string> => {
  
// //   const persona = PERSONAS.find(p => p.id === personaId);
// //   let systemInstruction = persona?.systemPrompt || "You are a helpful AI.";

// //   // 🧠 1. RECALL MEMORIES
// //   // We search for memories related to the CURRENT message
// //   try {
// //     console.log(`[AI] Searching memories for: "${message.slice(0, 20)}..."`);
// //     const relevantMemories = await memoryService.searchMemories(userId, message);

// //     if (relevantMemories.length > 0) {
// //       console.log(`[AI] Found ${relevantMemories.length} relevant memories.`);
// //       const memoryContext = `
// //       \n[LONG-TERM MEMORY ACTIVE]
// //       Relevant facts from past conversations:
// //       - ${relevantMemories.join("\n- ")}
// //       \n[END MEMORY]
// //       `;
// //       // Inject into the system prompt
// //       systemInstruction += memoryContext;
// //     }
// //   } catch (err) {
// //     console.warn("[AI] Memory retrieval failed (continuing without memory):", err);
// //   }

// //   // 2. Prepare History
// //   const historyFormatted = history.map(h => ({
// //     role: h.role === 'assistant' ? 'assistant' : 'user',
// //     content: h.content
// //   }));

// // ... imports ...

// export const generateAIResponse = async (
//   personaId: string, 
//   history: { role: 'user' | 'assistant'; content: string }[], 
//   message: string,
//   userId: string, 
//   imageUrl?: string 
// ): Promise<string> => {
  
//   const persona = PERSONAS.find(p => p.id === personaId);
//   let systemInstruction = persona?.systemPrompt || "You are a helpful AI.";

//   // 🧠 1. RECALL MEMORIES
//   // We search for memories related to the CURRENT message AND Persona
//   try {
//     // ✅ KEY FIX: Passing personaId to search
//     const relevantMemories = await memoryService.searchMemories(userId, personaId, message);

//     if (relevantMemories.length > 0) {
//       const memoryContext = `
//       \n[LONG-TERM MEMORY ACTIVE]
//       Relevant facts from past conversations with ${persona?.name}:
//       - ${relevantMemories.join("\n- ")}
//       \n[END MEMORY]
//       `;
//       systemInstruction += memoryContext;
//     }
//   } catch (err) {
//     console.warn("[AI] Memory retrieval failed:", err);
//   }

//   // ... rest of the function (formatting history, calling OpenAI) ...
//   // (The rest of your ai.service.ts code remains the same)
  
//   // Need the full file? Just keep the part below this unchanged:
//   const historyFormatted = history.map(h => ({
//     role: h.role === 'assistant' ? 'assistant' : 'user',
//     content: h.content
//   }));

//   // ... (rest of standard AI call logic) ...

//   // TEMPORARY RETURN FOR COMPILATION SAKE IF YOU COPY-PASTE:
//   // (Paste your existing Triple Threat logic here)
  
//   // -- FOR BREVITY, I assume you kept the Triple Threat logic below. 
//   // If you need the FULL ai.service.ts file again, let me know. --
  
//   // ...
  
//   // COPY-PASTE FRIENDLY BLOCK END
//   // 3. Prepare Current Message (Multimodal)
//   let userContent: any = message;
//   if (imageUrl) {
//     userContent = [
//       { type: "text", text: message },
//       { type: "image_url", image_url: { url: imageUrl } }
//     ];
//   }

//   // 4. Build Message Arrays
//   const messagesMultimodal = [
//     { role: 'system', content: systemInstruction },
//     ...historyFormatted,
//     { role: 'user', content: userContent }
//   ];

//   const messagesTextOnly = [
//     { role: 'system', content: systemInstruction },
//     ...historyFormatted,
//     { role: 'user', content: message + (imageUrl ? " [Image attachment lost in fallback]" : "") }
//   ];

//   // 🚀 THE CASCADE
//   try {
//     const reply = await callOpenRouter('openai/gpt-4o-mini', messagesMultimodal as any);
//     return `[GPT-4o] ${reply}`; 

//   } catch (err1) {
//     console.warn(`[AI] Primary failed. Switching...`);
//     try {
//       const reply = await callOpenRouter('openai/gpt-3.5-turbo', messagesTextOnly as any);
//       return `[GPT-3.5] ${reply}`; 

//     } catch (err2) {
//       console.warn(`[AI] Backup failed. Switching...`);
//       try {
//         const reply = await callOpenRouter('meta-llama/llama-3-8b-instruct:free', messagesTextOnly as any);
//         return `[Llama-3] ${reply}`; 
        
//       } catch (err3) {
//         console.error("Fatal AI Error:", err3);
//         return "[SYSTEM ERROR] I am unable to connect to any model right now.";
//       }
//     }
//   }
// };

// import OpenAI from 'openai';
// import { PERSONAS } from "../config/personas";
// import { memoryService } from './memory.service'; // 👈 Import Memory

// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1', 
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000',
//     'X-Title': 'AIDEN',
//   },
// });

// // Helper to make the actual API call
// async function callOpenRouter(model: string, messages: any[]) {
//   const completion = await openai.chat.completions.create({
//     model: model, 
//     messages: messages,
//   });
//   return completion.choices[0]?.message?.content || "";
// }

// export const generateAIResponse = async (
//   personaId: string, 
//   history: { role: 'user' | 'assistant'; content: string }[], 
//   message: string,
//   userId: string, // 👈 We need to know WHO is asking
//   imageUrl?: string 
// ): Promise<string> => {
  
//   const persona = PERSONAS.find(p => p.id === personaId);
//   let systemInstruction = persona?.systemPrompt || "You are a helpful AI.";

//   // 🧠 1. RECALL MEMORIES (Updated for Isolation)
//   // We search for memories related to the CURRENT message AND Persona
//   try {
//     console.log(`[AI] Searching memories for: "${message.slice(0, 20)}..."`);
    
//     // ✅ KEY FIX: Passing personaId as the 2nd argument
//     const relevantMemories = await memoryService.searchMemories(userId, personaId, message);

//     if (relevantMemories.length > 0) {
//       console.log(`[AI] Found ${relevantMemories.length} relevant memories.`);
//       const memoryContext = `
//       \n[LONG-TERM MEMORY ACTIVE]
//       Relevant facts from past conversations with ${persona?.name}:
//       - ${relevantMemories.join("\n- ")}
//       \n[END MEMORY]
//       `;
//       // Inject into the system prompt
//       systemInstruction += memoryContext;
//     }
//   } catch (err) {
//     console.warn("[AI] Memory retrieval failed (continuing without memory):", err);
//   }

//   // 2. Prepare History
//   const historyFormatted = history.map(h => ({
//     role: h.role === 'assistant' ? 'assistant' : 'user',
//     content: h.content
//   }));

//   // 3. Prepare Current Message (Multimodal)
//   let userContent: any = message;
//   if (imageUrl) {
//     userContent = [
//       { type: "text", text: message },
//       { type: "image_url", image_url: { url: imageUrl } }
//     ];
//   }

//   // 4. Build Message Arrays
//   const messagesMultimodal = [
//     { role: 'system', content: systemInstruction },
//     ...historyFormatted,
//     { role: 'user', content: userContent }
//   ];

//   const messagesTextOnly = [
//     { role: 'system', content: systemInstruction },
//     ...historyFormatted,
//     { role: 'user', content: message + (imageUrl ? " [Image attachment lost in fallback]" : "") }
//   ];

//   // 🚀 THE CASCADE
//   try {
//     const reply = await callOpenRouter('openai/gpt-4o-mini', messagesMultimodal as any);
//     return `[GPT-4o] ${reply}`; 

//   } catch (err1) {
//     console.warn(`[AI] Primary failed. Switching...`);
//     try {
//       const reply = await callOpenRouter('openai/gpt-3.5-turbo', messagesTextOnly as any);
//       return `[GPT-3.5] ${reply}`; 

//     } catch (err2) {
//       console.warn(`[AI] Backup failed. Switching...`);
//       try {
//         const reply = await callOpenRouter('meta-llama/llama-3-8b-instruct:free', messagesTextOnly as any);
//         return `[Llama-3] ${reply}`; 
        
//       } catch (err3) {
//         console.error("Fatal AI Error:", err3);
//         return "[SYSTEM ERROR] I am unable to connect to any model right now.";
//       }
//     }
//   }
// };

import OpenAI from 'openai';
import { PERSONAS } from "../config/personas";
import { memoryService } from './memory.service';
import { TOOLS, TOOL_DEFINITIONS } from "../config/tools"; 

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1', 
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'AIDEN',
  },
});

// Helper for calling the API
async function callOpenRouter(model: string, messages: any[], tools?: any[]) {
  const completion = await openai.chat.completions.create({
    model: model, 
    messages: messages,
    tools: tools, 
    tool_choice: tools ? "auto" : "none",
  });
  return completion.choices[0]?.message;
}

export const generateAIResponse = async (
  personaId: string, 
  history: { role: 'user' | 'assistant'; content: string }[], 
  message: string,
  userId: string,
  imageUrl?: string 
): Promise<string> => {
  
  const persona = PERSONAS.find(p => p.id === personaId);
  let systemInstruction = persona?.systemPrompt || "You are a helpful AI.";

  // 🧠 1. RECALL MEMORIES (Isolated)
  try {
    const relevantMemories = await memoryService.searchMemories(userId, personaId, message);
    if (relevantMemories.length > 0) {
      systemInstruction += `
      \n[LONG-TERM MEMORY ACTIVE]
      Relevant facts:
      - ${relevantMemories.join("\n- ")}
      \n[END MEMORY]
      `;
    }
  } catch (err) {
    console.warn("[AI] Memory retrieval failed:", err);
  }

  // 2. Prepare Messages
  const historyFormatted = history.map(h => ({
    role: h.role === 'assistant' ? 'assistant' : 'user',
    content: h.content
  }));

  let userContent: any = message;
  if (imageUrl) {
    userContent = [
      { type: "text", text: message },
      { type: "image_url", image_url: { url: imageUrl } }
    ];
  }

  const messages = [
    { role: 'system', content: systemInstruction },
    ...historyFormatted,
    { role: 'user', content: userContent }
  ];

  // 🚀 3. THE TOOL LOOP
  try {
    console.log("[AI] Thinking (checking tools)...");
    
    // Step A: Ask GPT-4o if it wants to use a tool
    let reply = await callOpenRouter('openai/gpt-4o-mini', messages as any, TOOL_DEFINITIONS);
    
    // Step B: Did it ask for a tool?
    if (reply?.tool_calls) {
      console.log(`[AI] Tool Request: ${reply.tool_calls.length} actions.`);
      
      // 1. Add the "Request" to history
      messages.push(reply as any);

      // 2. Execute the tools
      // ⚠️ FIX: Added 'as any' to bypass the TypeScript error
      for (const toolCall of reply.tool_calls as any[]) {
        const functionName = toolCall.function.name;
        const args = JSON.parse(toolCall.function.arguments);
        
        console.log(`[AI] Executing: ${functionName}`, args);

        // Run the actual code from tools.ts
        const toolResult = await TOOLS[functionName].execute(args);

        // 3. Add the "Result" to history
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: toolResult,
        } as any);
      }

      // Step C: Ask GPT-4o again (with the result)
      console.log("[AI] Generating final answer with tool data...");
      const finalReply = await callOpenRouter('openai/gpt-4o-mini', messages as any);
      return `[GPT-4o + Tool] ${finalReply?.content}`;
    }

    // No tool needed? Just return the text.
    return `[GPT-4o] ${reply?.content}`;

  } catch (err) {
    console.error("[AI] Tool Error:", err);
    return "I tried to use a tool but something went wrong.";
  }
};