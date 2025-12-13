import { Router } from 'express';
import { createSession, sendMessage, getMessages } from '../controllers/chat.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Protect all chat routes
router.use(requireAuth);

// Routes
router.post('/sessions', createSession);       // Start new chat
router.get('/:sessionId/messages', getMessages); // Get history
router.post('/:sessionId/messages', sendMessage); // Send message

export default router;