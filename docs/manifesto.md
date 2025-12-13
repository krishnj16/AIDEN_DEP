# AIDEN Manifesto

## 1. Identity
**AIDEN** (Artificial Intelligence Deployed for Executive Navigation) is a persistent, persona-based AI assistant designed for private, local use.
It is NOT a public SaaS. It is NOT a generic chatbot.

## 2. Core Promise
AIDEN remembers. Unlike ChatGPT, AIDEN stores long-term context about my projects, preferences, and life in a private vector database.
AIDEN adapts. It can switch from "Jarvis" (efficient coder) to "Marcus" (stoic advisor) instantly, without bleeding context.

## 3. The Golden Rules
1. **Backend is the Brain:** All logic, memory, and API calls happen in Node.js. The frontend is dumb.
2. **Zero Cost:** The architecture must run on free tiers (Gemini Flash, Groq, Supabase Free).
3. **Private by Design:** Data is stored in my own Supabase instance. No public exposure of keys.

## 4. The Stack (Locked)
- **Brain:** Node.js + TypeScript
- **Database:** Supabase (Postgres + Auth)
- **Memory:** Qdrant (Vector Search)
- **Intelligence:** Google Gemini 1.5 Flash (Text + Vision)
- **Ears:** Groq API (Whisper)
- **Voice:** Edge-TTS
- **Face:** React + Vite (Built via Lovable)