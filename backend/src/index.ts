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

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080', 
  credentials: true 
})); 

app.get('/health', (req, res) => {
  res.send('AIDEN Backend is Online');
});

app.use('/auth', authRoutes);
app.use('/api/personas', personaRoutes); 
app.use('/api/chats', chatRoutes);

app.get('/api/protected', requireAuth, (req, res) => {
  const user = (req as any).user;
  res.json({ 
    message: `Hello, ${user.email}. You are authorized.`,
    secret_data: 'Only you can see this.'
  });
});

app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});