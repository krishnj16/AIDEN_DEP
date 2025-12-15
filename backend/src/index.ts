// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import chatRoutes from './routes/chat.routes';
// import authRoutes from './routes/auth.routes';
// import personaRoutes from './routes/persona.routes'; 
// import { requireAuth } from './middleware/auth.middleware';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:8080', 
//   credentials: true 
// })); 

// app.get('/health', (req, res) => {
//   res.send('AIDEN Backend is Online');
// });

// app.use('/api/auth', authRoutes);
// app.use('/api/personas', personaRoutes); 
// app.use('/api/chats', chatRoutes);

// app.get('/api/protected', requireAuth, (req, res) => {
//   const user = (req as any).user;
//   res.json({ 
//     message: `Hello, ${user.email}. You are authorized.`,
//     secret_data: 'Only you can see this.'
//   });
// });

// app.listen(port, () => {
//   console.log(` Server running at http://localhost:${port}`);
// });

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import chatRoutes from './routes/chat.routes';
// import authRoutes from './routes/auth.routes';
// import personaRoutes from './routes/persona.routes'; 
// import { requireAuth } from './middleware/auth.middleware';
// import { memoryService } from './service/memory.service';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // ✅ FIX 1: Flexible CORS
// // This allows connections from localhost:8080 OR localhost:5173 (Vite)
// app.use(cors({
//   origin: true, 
//   credentials: true 
// })); 

// app.use(express.json());

// app.get('/health', (req, res) => {
//   res.send('AIDEN Backend is Online');
// });

// // ✅ FIX 2: Standardized Routing
// // Everything now lives under /api. simpler to manage.
// app.use('/api/auth', authRoutes);
// app.use('/api/personas', personaRoutes); 
// app.use('/api/chats', chatRoutes);

// app.get('/api/protected', requireAuth, (req, res) => {
//   const user = (req as any).user;
//   res.json({ 
//     message: `Hello, ${user.email}. You are authorized.`,
//   });
// });
// app.listen(port, async () => { 
//   console.log(`Server running at http://localhost:${port}`);
  
//   await memoryService.initialize();
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
// import express from 'express';
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// // ✅ Import Routes
// import chatRoutes from './routes/chat.routes';
// import authRoutes from './routes/auth.routes';
// import personaRoutes from './routes/persona.routes'; 
// import { requireAuth } from './middleware/auth.middleware';
// import { memoryService } from './service/memory.service'; // Ensure path is correct

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors({ origin: true, credentials: true })); 
// app.use(express.json());

// // 🔍 DEBUG LOGGER: This prints every request to the terminal
// app.use((req, res, next) => {
//   console.log(`[Request] ${req.method} ${req.url}`);
//   next();
// });

// // Health Check
// app.get('/health', (req, res) => {
//   res.send('AIDEN Backend is Online');
// });

// // 🚀 ROUTE MAP
// app.use('/api/auth', authRoutes);
// app.use('/api/personas', personaRoutes); 

// // ⚠️ THE CRITICAL FIX: "chat" must be SINGULAR to match frontend
// app.use('/api/chat', chatRoutes);

// // Protected Test Route
// app.get('/api/protected', requireAuth, (req, res) => {
//   const user = (req as any).user;
//   res.json({ message: `Hello, ${user.email}.` });
// });

// // 404 Handler (Debug helper)
// app.use((req, res) => {
//   console.log(`[404] Route not found: ${req.url}`);
//   res.status(404).json({ error: `Route not found: ${req.url}` });
// });

// // Start Server
// app.listen(port, async () => { 
//   console.log(`\n🟢 Server running at http://localhost:${port}`);
//   console.log(`👉 Routes active at: /api/chat/...\n`);
  
//   await memoryService.initialize();
// });


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// ✅ Import Routes
import chatRoutes from './routes/chat.routes';
import authRoutes from './routes/auth.routes';
import personaRoutes from './routes/persona.routes'; 
import { requireAuth } from './middleware/auth.middleware';
import { memoryService } from './service/memory.service'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: true, credentials: true })); 

// ✅ FIXED: Increased limit to 50mb to allow image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 🔍 DEBUG LOGGER: Prints every request to the terminal
app.use((req, res, next) => {
  console.log(`[Request] ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/health', (req, res) => {
  res.send('AIDEN Backend is Online');
});

// 🚀 ROUTE MAP
app.use('/api/auth', authRoutes);
app.use('/api/personas', personaRoutes); 
app.use('/api/chat', chatRoutes);

// Protected Test Route
app.get('/api/protected', requireAuth, (req, res) => {
  const user = (req as any).user;
  res.json({ message: `Hello, ${user.email}.` });
});

// 404 Handler
app.use((req, res) => {
  console.log(`[404] Route not found: ${req.url}`);
  res.status(404).json({ error: `Route not found: ${req.url}` });
});

// Start Server
app.listen(port, async () => { 
  console.log(`\n🟢 Server running at http://localhost:${port}`);
  console.log(`👉 Routes active at: /api/chat/...\n`);
  
  await memoryService.initialize();
});