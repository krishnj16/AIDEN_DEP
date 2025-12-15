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

// import { Router } from 'express';
// import { requireAuth } from '../middleware/auth.middleware';
// import { 
//   createSession, 
//   getMessages, 
//   sendMessage, 
//   getUserSessions 
// } from '../controllers/chat.controller';

// const router = Router();

// // 1. Create a new chat session
// router.post('/sessions', requireAuth, createSession);

// // 2. Get list of all sessions (Sidebar)
// router.get('/sessions', requireAuth, getUserSessions);

// // 3. Get history of a specific session (The one giving you 404!)
// router.get('/:id/messages', requireAuth, getMessages);

// // 4. Send a message to a session
// router.post('/:id/messages', requireAuth, sendMessage);


// export default router;

// import { Router } from 'express';
// import { requireAuth } from '../middleware/auth.middleware';
// import {
//   createSession,
//   getMessages,
//   sendMessage,
//   getUserSessions,
//   routeMessage // 👈 This must match the export in the controller
// } from '../controllers/chat.controller';

// const router = Router();

// // 1. Create a new chat session
// router.post('/sessions', requireAuth, createSession);

// // 2. Get list of all sessions (Sidebar)
// router.get('/sessions', requireAuth, getUserSessions);

// // 🆕 ROUTE: Route message to persona
// // ⚠️ IMPORTANT: Place this BEFORE the /:id routes to prevent conflict
// router.post('/route', requireAuth, routeMessage); 

// // 3. Get history of a specific session
// router.get('/:id/messages', requireAuth, getMessages);

// // 4. Send a message to a specific session
// router.post('/:id/messages', requireAuth, sendMessage);

// export default router;

import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import {
  createSession,
  getMessages,
  sendMessage,
  getUserSessions,
  routeMessage ,
  deleteSession,    // 👈 Import this
  clearAllSessions  // 👈 Import this
} from '../controllers/chat.controller';

const router = Router();

// 🚨 PLACE THIS FIRST - High Priority Route
router.post('/route', requireAuth, routeMessage);

// Standard Routes
router.post('/sessions', requireAuth, createSession);
router.get('/sessions', requireAuth, getUserSessions);
router.get('/:id/messages', requireAuth, getMessages);
router.post('/:id/messages', requireAuth, sendMessage);
router.delete('/sessions', requireAuth, clearAllSessions); // Clear All
router.delete('/sessions/:id', requireAuth, deleteSession); // Delete One

export default router;