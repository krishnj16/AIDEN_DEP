// import { QdrantClient } from '@qdrant/js-client-rest';
// import OpenAI from 'openai';
// import dotenv from 'dotenv';
// import { v4 as uuidv4 } from 'uuid'; // You might need to install this: npm install uuid @types/uuid

// dotenv.config();

// // 1. Setup Qdrant (The Database)
// const qdrant = new QdrantClient({
//   url: process.env.QDRANT_URL,
//   apiKey: process.env.QDRANT_API_KEY,
// });

// // 2. Setup OpenAI (The Embedding Generator)
// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1',
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000',
//     'X-Title': 'AIDEN',
//   },
// });

// const COLLECTION_NAME = 'aiden_memory';

// export const memoryService = {
//   // A. Initialize (Run once on startup)
//   initialize: async () => {
//     try {
//       const result = await qdrant.getCollections();
//       const exists = result.collections.some(c => c.name === COLLECTION_NAME);

//       if (!exists) {
//         console.log(`[Memory] Creating long-term storage: ${COLLECTION_NAME}...`);
//         await qdrant.createCollection(COLLECTION_NAME, {
//           vectors: {
//             size: 1536, // Must match OpenAI embedding size
//             distance: 'Cosine',
//           },
//         });
//         console.log('[Memory] Initialization Complete. 🧠');
//       } else {
//         console.log('[Memory] Connected to long-term storage.');
//       }
//     } catch (error) {
//       console.error('[Memory] Connection Failed:', error);
//     }
//   },

//   // B. Add a Memory (Save)
//   addMemory: async (userId: string, text: string, metadata?: any) => {
//     try {
//       if (!text || text.trim().length < 5) return; // Skip short/empty stuff

//       console.log(`[Memory] Encoding: "${text.slice(0, 30)}..."`);
      
//       // 1. Convert Text -> Numbers (Vector)
//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small', 
//         input: text,
//       });
      
//       const vector = embedding.data[0].embedding;

//       // 2. Save to Qdrant
//       await qdrant.upsert(COLLECTION_NAME, {
//         wait: true,
//         points: [
//           {
//             id: uuidv4(), // Generate a unique ID for this memory
//             vector: vector,
//             payload: {
//               userId,
//               text,
//               timestamp: new Date().toISOString(),
//               ...metadata
//             }
//           }
//         ]
//       });
//       console.log(`[Memory] Saved to Brain 💾`);

//     } catch (error) {
//       console.error('[Memory] Failed to save:', error);
//     }
//   },

//   // C. Search Memories (Recall)
//   searchMemories: async (userId: string, query: string, limit = 3) => {
//     try {
//       // 1. Convert Query -> Numbers
//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small',
//         input: query,
//       });
//       const vector = embedding.data[0].embedding;

//       // 2. Search Qdrant for similar numbers
//       const searchResult = await qdrant.search(COLLECTION_NAME, {
//         vector: vector,
//         limit: limit,
//         filter: {
//           must: [
//             {
//               key: 'userId',
//               match: { value: userId } // Only search THIS user's memories
//             }
//           ]
//         }
//       });

//       // 3. Return the text matches
//       return searchResult.map(res => res.payload?.text as string).filter(Boolean);

//     } catch (error) {
//       console.error('[Memory] Search failed:', error);
//       return [];
//     }
//   }
// };
// import { QdrantClient } from '@qdrant/js-client-rest';
// import OpenAI from 'openai';
// import dotenv from 'dotenv';
// // @ts-ignore
// import { v4 as uuidv4 } from 'uuid';

// dotenv.config();

// // 1. Setup Qdrant
// const qdrant = new QdrantClient({
//   url: process.env.QDRANT_URL,
//   apiKey: process.env.QDRANT_API_KEY,
// });

// // 2. Setup OpenAI (OpenRouter)
// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1',
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000',
//     'X-Title': 'AIDEN',
//   },
// });

// const COLLECTION_NAME = 'aiden_memory';

// export const memoryService = {
//   // A. Initialize (Run once on startup)
//   initialize: async () => {
//     try {
//       const result = await qdrant.getCollections();
//       const exists = result.collections.some(
//         c => c.name === COLLECTION_NAME
//       );

//       if (!exists) {
//         console.log(`[Memory] Creating long-term storage: ${COLLECTION_NAME}...`);
//         await qdrant.createCollection(COLLECTION_NAME, {
//           vectors: {
//             size: 1536,
//             distance: 'Cosine',
//           },
//         });
//         console.log('[Memory] Initialization Complete. 🧠');
//       } else {
//         console.log('[Memory] Connected to long-term storage.');
//       }
//     } catch (error) {
//       console.error('[Memory] Connection Failed:', error);
//     }
//   },

//   // B. Add a Memory (Save) ✅ FIXED SIGNATURE
//   addMemory: async ({
//     userId,
//     sessionId,
//     role,
//     content,
//   }: {
//     userId: string;
//     sessionId: string;
//     role: 'user' | 'assistant';
//     content: string;
//   }) => {
//     try {
//       if (!content || content.trim().length < 5) return;

//       console.log(`[Memory] Encoding: "${content.slice(0, 30)}..."`);

//       // 1. Text → Embedding
//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small',
//         input: content,
//       });

//       const vector = embedding.data[0].embedding;

//       // 2. Save to Qdrant
//       await qdrant.upsert(COLLECTION_NAME, {
//         wait: true,
//         points: [
//           {
//             id: uuidv4(),
//             vector,
//             payload: {
//               userId,
//               sessionId,
//               role,
//               text: content,
//               timestamp: new Date().toISOString(),
//             },
//           },
//         ],
//       });

//       console.log('[Memory] Saved to Brain 💾');
//     } catch (error) {
//       console.error('[Memory] Failed to save:', error);
//     }
//   },

//   // C. Search Memories (Recall)
//   searchMemories: async (userId: string, query: string, limit = 3) => {
//     try {
//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small',
//         input: query,
//       });

//       const vector = embedding.data[0].embedding;

//       const searchResult = await qdrant.search(COLLECTION_NAME, {
//         vector,
//         limit,
//         filter: {
//           must: [
//             {
//               key: 'userId',
//               match: { value: userId },
//             },
//           ],
//         },
//       });

//       return searchResult
//         .map(res => res.payload?.text as string)
//         .filter(Boolean);
//     } catch (error) {
//       console.error('[Memory] Search failed:', error);
//       return [];
//     }
//   },
// };
// @ts-ignore
// import { v4 as uuidv4 } from 'uuid';
// import { QdrantClient } from '@qdrant/js-client-rest';
// import OpenAI from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// // 1. Setup Qdrant
// const qdrant = new QdrantClient({
//   url: process.env.QDRANT_URL,
//   apiKey: process.env.QDRANT_API_KEY,
// });

// // 2. Setup OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1',
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000',
//     'X-Title': 'AIDEN',
//   },
// });

// const COLLECTION_NAME = 'aiden_memory';

// export const memoryService = {
//   // A. Initialize (Run once on startup)
//   initialize: async () => {
//     try {
//       const result = await qdrant.getCollections();
//       const exists = result.collections.some(c => c.name === COLLECTION_NAME);

//       // 1. Create Collection if missing
//       if (!exists) {
//         console.log(`[Memory] Creating long-term storage: ${COLLECTION_NAME}...`);
//         await qdrant.createCollection(COLLECTION_NAME, {
//           vectors: {
//             size: 1536,
//             distance: 'Cosine',
//           },
//         });
//       }

//       // 2. ✅ CREATE INDEX (The Fix)
//       // We try to create the index for 'userId' so we can filter by it.
//       // We wrap it in a try/catch so it doesn't crash if it already exists.
//       try {
//         await qdrant.createPayloadIndex(COLLECTION_NAME, {
//           field_name: 'userId',
//           field_schema: 'keyword', // 'keyword' is best for IDs
//           wait: true,
//         });
//         console.log('[Memory] Payload Index checked/created. 🧠');
//       } catch (err) {
//         // If index exists, Qdrant might throw an error or just ignore it. 
//         // We log slightly just in case, but usually it's fine.
//         console.log('[Memory] Index likely exists (skipping creation).');
//       }
      
//       console.log('[Memory] Ready.');

//     } catch (error) {
//       console.error('[Memory] Connection Failed:', error);
//     }
//   },

//   // B. Add a Memory (Save)
//   addMemory: async (userId: string, text: string, metadata?: any) => {
//     try {
//       if (!text || text.trim().length < 5) return;

//       console.log(`[Memory] Encoding: "${text.slice(0, 30)}..."`);
      
//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small', 
//         input: text,
//       });
      
//       const vector = embedding.data[0].embedding;

//       await qdrant.upsert(COLLECTION_NAME, {
//         wait: true,
//         points: [
//           {
//             id: uuidv4(),
//             vector: vector,
//             payload: {
//               userId,
//               text,
//               timestamp: new Date().toISOString(),
//               ...metadata
//             }
//           }
//         ]
//       });
//       console.log(`[Memory] Saved to Brain 💾`);

//     } catch (error) {
//       console.error('[Memory] Failed to save:', error);
//     }
//   },

//   // C. Search Memories (Recall)
//   searchMemories: async (userId: string, query: string, limit = 3) => {
//     try {
//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small',
//         input: query,
//       });
//       const vector = embedding.data[0].embedding;

//       const searchResult = await qdrant.search(COLLECTION_NAME, {
//         vector: vector,
//         limit: limit,
//         // ✅ This filter requires the index we just added above
//         filter: {
//           must: [
//             {
//               key: 'userId',
//               match: { value: userId } 
//             }
//           ]
//         }
//       });

//       return searchResult.map(res => res.payload?.text as string).filter(Boolean);

//     } catch (error) {
//       console.error('[Memory] Search failed:', error);
//       return [];
//     }
//   }
// };

// @ts-ignore
// import { v4 as uuidv4 } from 'uuid';
// import { QdrantClient } from '@qdrant/js-client-rest';
// import OpenAI from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// const qdrant = new QdrantClient({
//   url: process.env.QDRANT_URL,
//   apiKey: process.env.QDRANT_API_KEY,
// });

// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1',
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000',
//     'X-Title': 'AIDEN',
//   },
// });

// const COLLECTION_NAME = 'aiden_memory';

// export const memoryService = {
//   initialize: async () => {
//     try {
//       const result = await qdrant.getCollections();
//       const exists = result.collections.some(c => c.name === COLLECTION_NAME);

//       if (!exists) {
//         await qdrant.createCollection(COLLECTION_NAME, {
//           vectors: { size: 1536, distance: 'Cosine' },
//         });
//       }

//       // Force create indexes
//       try {
//         await qdrant.createPayloadIndex(COLLECTION_NAME, {
//           field_name: 'personaId',
//           field_schema: 'keyword', 
//           wait: true,
//         });
//         await qdrant.createPayloadIndex(COLLECTION_NAME, {
//           field_name: 'userId',
//           field_schema: 'keyword', 
//           wait: true,
//         });
//         console.log('[Memory] Indexes OK.');
//       } catch (err) { /* Ignore */ }
      
//       console.log('[Memory] Ready.');
//     } catch (error) {
//       console.error('[Memory] Connection Failed:', error);
//     }
//   },

//   addMemory: async (userId: string, personaId: string, text: string, metadata?: any) => {
//     try {
//       if (!text || text.trim().length < 5) return;

//       // 🔍 DEBUG LOG
//       console.log(`[Memory Save] User: ${userId} | Persona: ${personaId} | Text: "${text.slice(0, 15)}..."`);
      
//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small', 
//         input: text,
//       });
      
//       await qdrant.upsert(COLLECTION_NAME, {
//         wait: true,
//         points: [
//           {
//             id: uuidv4(),
//             vector: embedding.data[0].embedding,
//             payload: {
//               userId,
//               personaId, // ✅ Must be present!
//               text,
//               timestamp: new Date().toISOString(),
//               ...metadata
//             }
//           }
//         ]
//       });
//       console.log(`[Memory] Saved ✅`);

//     } catch (error) {
//       console.error('[Memory] Save Error:', error);
//     }
//   },

//   searchMemories: async (userId: string, personaId: string, query: string, limit = 3) => {
//     try {
//       // 🔍 DEBUG LOG
//       console.log(`[Memory Search] User: ${userId} | Persona: ${personaId} | Query: "${query.slice(0, 15)}..."`);

//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small',
//         input: query,
//       });

//       const searchResult = await qdrant.search(COLLECTION_NAME, {
//         vector: embedding.data[0].embedding,
//         limit: limit,
//         filter: {
//           must: [
//             { key: 'userId', match: { value: userId } },
//             { key: 'personaId', match: { value: personaId } } 
//           ]
//         }
//       });

//       console.log(`[Memory] Found ${searchResult.length} matches.`);
//       return searchResult.map(res => res.payload?.text as string).filter(Boolean);

//     } catch (error) {
//       console.error('[Memory] Search Error:', error);
//       return [];
//     }
//   }
// };
// @ts-ignore
// import { v4 as uuidv4 } from 'uuid';
// import { QdrantClient } from '@qdrant/js-client-rest';
// import OpenAI from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// const qdrant = new QdrantClient({
//   url: process.env.QDRANT_URL,
//   apiKey: process.env.QDRANT_API_KEY,
// });

// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1',
//   defaultHeaders: {
//     'HTTP-Referer': 'http://localhost:3000',
//     'X-Title': 'AIDEN',
//   },
// });

// const COLLECTION_NAME = 'aiden_memory';

// export const memoryService = {
//   initialize: async () => {
//     try {
//       const result = await qdrant.getCollections();
//       const exists = result.collections.some(c => c.name === COLLECTION_NAME);

//       if (!exists) {
//         await qdrant.createCollection(COLLECTION_NAME, {
//           vectors: { size: 1536, distance: 'Cosine' },
//         });
//       }

//       // Force create indexes for filtering
//       try {
//         await qdrant.createPayloadIndex(COLLECTION_NAME, {
//           field_name: 'personaId',
//           field_schema: 'keyword', 
//           wait: true,
//         });
//         await qdrant.createPayloadIndex(COLLECTION_NAME, {
//           field_name: 'userId',
//           field_schema: 'keyword', 
//           wait: true,
//         });
//         console.log('[Memory] Isolation Indexes OK.');
//       } catch (err) { /* Ignore */ }
      
//       console.log('[Memory] Ready.');
//     } catch (error) {
//       console.error('[Memory] Connection Failed:', error);
//     }
//   },

//   // ✅ ADD MEMORY (Requires Persona ID)
//   addMemory: async (userId: string, personaId: string, text: string, metadata?: any) => {
//     try {
//       if (!text || text.trim().length < 5) return;

//       // 🔍 DEBUG LOG
//       console.log(`[Memory Save] User: ${userId} | Persona: ${personaId} | Text: "${text.slice(0, 15)}..."`);
      
//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small', 
//         input: text,
//       });
      
//       await qdrant.upsert(COLLECTION_NAME, {
//         wait: true,
//         points: [
//           {
//             id: uuidv4(),
//             vector: embedding.data[0].embedding,
//             payload: {
//               userId,
//               personaId, // ✅ Saved here
//               text,
//               timestamp: new Date().toISOString(),
//               ...metadata
//             }
//           }
//         ]
//       });
//       console.log(`[Memory] Saved ✅`);

//     } catch (error) {
//       console.error('[Memory] Save Error:', error);
//     }
//   },

//   // ✅ SEARCH MEMORIES (Requires Persona ID)
//   searchMemories: async (userId: string, personaId: string, query: string, limit = 3) => {
//     try {
//       // 🔍 DEBUG LOG
//       console.log(`[Memory Search] User: ${userId} | Persona: ${personaId} | Query: "${query.slice(0, 15)}..."`);

//       const embedding = await openai.embeddings.create({
//         model: 'openai/text-embedding-3-small',
//         input: query,
//       });

//       const searchResult = await qdrant.search(COLLECTION_NAME, {
//         vector: embedding.data[0].embedding,
//         limit: limit,
//         // ✅ DOUBLE FILTER: User + Persona
//         filter: {
//           must: [
//             { key: 'userId', match: { value: userId } },
//             { key: 'personaId', match: { value: personaId } } 
//           ]
//         }
//       });

//       console.log(`[Memory] Found ${searchResult.length} matches.`);
//       return searchResult.map(res => res.payload?.text as string).filter(Boolean);

//     } catch (error) {
//       console.error('[Memory] Search Error:', error);
//       return [];
//     }
//   }
// };


// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { QdrantClient } from '@qdrant/js-client-rest';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'AIDEN',
  },
});

const COLLECTION_NAME = 'aiden_memory';

export const memoryService = {
  initialize: async () => {
    try {
      const result = await qdrant.getCollections();
      const exists = result.collections.some(c => c.name === COLLECTION_NAME);

      if (!exists) {
        await qdrant.createCollection(COLLECTION_NAME, {
          vectors: { size: 1536, distance: 'Cosine' },
        });
      }

      // Ensure indexes exist for fast filtering
      try {
        await qdrant.createPayloadIndex(COLLECTION_NAME, {
          field_name: 'personaId',
          field_schema: 'keyword', 
          wait: true,
        });
        await qdrant.createPayloadIndex(COLLECTION_NAME, {
          field_name: 'userId',
          field_schema: 'keyword', 
          wait: true,
        });
      } catch (err) { /* Indexes likely exist */ }
      
      console.log('[Memory] System Online (Isolated). 🧠');
    } catch (error) {
      console.error('[Memory] Connection Failed:', error);
    }
  },

  // ✅ ADDED: personaId argument
  addMemory: async (userId: string, personaId: string, text: string, metadata?: any) => {
    try {
      if (!text || text.trim().length < 5) return;

      const embedding = await openai.embeddings.create({
        model: 'openai/text-embedding-3-small', 
        input: text,
      });
      
      await qdrant.upsert(COLLECTION_NAME, {
        wait: true,
        points: [
          {
            id: uuidv4(),
            vector: embedding.data[0].embedding,
            payload: {
              userId,
              personaId, // 👈 KEY: Tagging the memory
              text,
              timestamp: new Date().toISOString(),
              ...metadata
            }
          }
        ]
      });
      // console.log(`[Memory] Saved to ${personaId}'s storage.`); // Uncomment for debugging

    } catch (error) {
      console.error('[Memory] Save Error:', error);
    }
  },

  // ✅ ADDED: personaId argument
  searchMemories: async (userId: string, personaId: string, query: string, limit = 3) => {
    try {
      const embedding = await openai.embeddings.create({
        model: 'openai/text-embedding-3-small',
        input: query,
      });

      const searchResult = await qdrant.search(COLLECTION_NAME, {
        vector: embedding.data[0].embedding,
        limit: limit,
        // ✅ KEY: Strict Filter
        filter: {
          must: [
            { key: 'userId', match: { value: userId } },
            { key: 'personaId', match: { value: personaId } } 
          ]
        }
      });

      return searchResult.map(res => res.payload?.text as string).filter(Boolean);

    } catch (error) {
      console.error('[Memory] Search Error:', error);
      return [];
    }
  }
};