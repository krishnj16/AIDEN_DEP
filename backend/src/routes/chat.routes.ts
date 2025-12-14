// import { Router } from 'express';
// import { createSession, sendMessage, getMessages,getUserSessions } from '../controllers/chat.controller';
// import { requireAuth } from '../middleware/auth.middleware';


// const router = Router();

// // Protect all chat routes
// router.use(requireAuth);

// // Routes
// router.post('/sessions', createSession);       // Start new chat
// router.get('/:sessionId/messages', getMessages); // Get history
// router.get('/sessions', requireAuth, getUserSessions);
// router.post('/:sessionId/messages', sendMessage); // Send message

// export default router;

import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { 
  createSession, 
  getMessages, 
  sendMessage, 
  getUserSessions 
} from '../controllers/chat.controller';

const router = Router();

// 1. Create a new chat session
router.post('/sessions', requireAuth, createSession);

// 2. Get list of all sessions (Sidebar)
router.get('/sessions', requireAuth, getUserSessions);

// 3. Get history of a specific session (The one giving you 404!)
router.get('/:id/messages', requireAuth, getMessages);

// 4. Send a message to a session
router.post('/:id/messages', requireAuth, sendMessage);

export default router;