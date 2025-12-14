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

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat.routes';
import authRoutes from './routes/auth.routes';
import personaRoutes from './routes/persona.routes'; 
import { requireAuth } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ FIX 1: Flexible CORS
// This allows connections from localhost:8080 OR localhost:5173 (Vite)
app.use(cors({
  origin: true, 
  credentials: true 
})); 

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('AIDEN Backend is Online');
});

// ✅ FIX 2: Standardized Routing
// Everything now lives under /api. simpler to manage.
app.use('/api/auth', authRoutes);
app.use('/api/personas', personaRoutes); 
app.use('/api/chats', chatRoutes);

app.get('/api/protected', requireAuth, (req, res) => {
  const user = (req as any).user;
  res.json({ 
    message: `Hello, ${user.email}. You are authorized.`,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});