# AIDEN - Core Repository

## Project Overview
A multi-modal, persistent AI assistant built for local execution with a $0 operating cost.

## Architecture
| Component | Tech Choice | Purpose |
| :--- | :--- | :--- |
| **Backend** | Node.js (Express) | API Logic & Orchestration |
| **Language** | TypeScript | Type safety & maintainability |
| **Database** | Supabase | Auth, User Data, File Storage |
| **Memory** | Qdrant | Vector storage for long-term recall |
| **AI Model** | Gemini 1.5 Flash | Thinking & Vision (Free Tier) |
| **Voice** | Groq + Edge-TTS | Fast STT and Natural TTS |
| **Frontend** | React + Vite | UI (Scaffolded by Lovable) |

## Development Phases
- [ ] Phase 1: Foundation (Backend Skeleton)
- [ ] Phase 2: Frontend & Basic Chat
- [ ] Phase 3: Intelligence (Memory & Vision)
- [ ] Phase 4: Voice Integration
- [ ] Phase 5: Polish & Deployment

## Setup
1. `cd backend` && `npm install`
2. Configure `.env` (See `.env.example`)
3. `npm run dev`