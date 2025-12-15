// import { Request, Response } from 'express';
// import { supabase } from '../lib/supabase'; // Ensure you have this file from Day 7
// import { PERSONAS } from '../config/personas';


// // 1. Create a New Chat Session
// export const createSession = async (req: Request, res: Response) => {
//   try {
//     const { personaId } = req.body;
//     const user = (req as any).user;

//     // Validate if Persona exists in our config
//     const persona = PERSONAS.find(p => p.id === personaId);
//     if (!persona) {
//       return res.status(404).json({ error: 'Persona not found' });
//     }

//     // Create session in Supabase
//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .insert({
//         user_id: user.id,
//         persona_id: persona.id,
//         title: `Chat with ${persona.name}`
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     res.status(201).json({ success: true, session: data });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 2. Send a Message (User speaks -> AI echoes back for now)
// export const sendMessage = async (req: Request, res: Response) => {
//   try {
//     const { sessionId } = req.params;
//     const { content } = req.body;
//     const user = (req as any).user;

//     // A. Verify ownership of the session
//     const { data: session, error: sessionError } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('id', sessionId)
//       .eq('user_id', user.id)
//       .single();

//     if (sessionError || !session) {
//       return res.status(404).json({ error: 'Session not found' });
//     }

//     // B. Save User Message to DB
//     await supabase.from('messages').insert({
//       session_id: sessionId,
//       role: 'user',
//       content: content
//     });

//     // C. Generate "AI" Response (Mock logic for today)
//     // We look up who the persona is from our Config file
//     const currentPersona = PERSONAS.find(p => p.id === session.persona_id);
    
//     // Simple logic to prove the server knows who it is
//     const aiResponseText = `[${currentPersona?.name}]: I heard you say "${content}". (AI Integration coming soon!)`;

//     // D. Save AI Response to DB
//     const { data: aiMessage, error: msgError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: sessionId,
//         role: 'assistant',
//         content: aiResponseText
//       })
//       .select()
//       .single();

//     if (msgError) throw msgError;

//     res.json({ success: true, message: aiMessage });

//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 3. Get Chat History
// export const getMessages = async (req: Request, res: Response) => {
//   try {
//     const { sessionId } = req.params;
//     const user = (req as any).user;

//     // Check permissions via RLS policy implicitly, but good to check session ownership
//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', sessionId)
//       .order('created_at', { ascending: true }); // Oldest first

//     if (error) throw error;

//     res.json({ success: true, data });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };


// import { Request, Response } from 'express';
// import { supabase } from '../lib/supabase'; // Ensure you have this file from Day 7
// import { PERSONAS } from '../config/personas';

// // 1. Create a New Chat Session
// export const createSession = async (req: Request, res: Response) => {
//   try {
//     const { personaId } = req.body;
//     const user = (req as any).user;

//     // Validate if Persona exists in our config
//     const persona = PERSONAS.find(p => p.id === personaId);
//     if (!persona) {
//       return res.status(404).json({ error: 'Persona not found' });
//     }

//     // Create session in Supabase
//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .insert({
//         user_id: user.id,
//         persona_id: persona.id,
//         title: `Chat with ${persona.name}`
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     res.status(201).json({ success: true, session: data });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 2. Send a Message (User speaks -> AI echoes back for now)
// export const sendMessage = async (req: Request, res: Response) => {
//   try {
//     const { sessionId } = req.params;
//     const { content } = req.body;
//     const user = (req as any).user;

//     // A. Verify ownership of the session
//     const { data: session, error: sessionError } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('id', sessionId)
//       .eq('user_id', user.id)
//       .single();

//     if (sessionError || !session) {
//       return res.status(404).json({ error: 'Session not found' });
//     }

//     // B. Save User Message to DB
//     await supabase.from('messages').insert({
//       session_id: sessionId,
//       role: 'user',
//       content: content
//     });

//     // C. Generate "AI" Response (Mock logic for today)
//     const currentPersona = PERSONAS.find(p => p.id === session.persona_id);

//     const aiResponseText = `[${currentPersona?.name}]: I heard you say "${content}". (AI Integration coming soon!)`;

//     // D. Save AI Response to DB
//     const { data: aiMessage, error: msgError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: sessionId,
//         role: 'assistant',
//         content: aiResponseText
//       })
//       .select()
//       .single();

//     if (msgError) throw msgError;

//     res.json({ success: true, message: aiMessage });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 3. Get Chat History
// export const getMessages = async (req: Request, res: Response) => {
//   try {
//     const { sessionId } = req.params;

//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', sessionId)
//       .order('created_at', { ascending: true });

//     if (error) throw error;

//     res.json({ success: true, data });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // 4. Get User Sessions (NEW — Step 1.1)
// export const getUserSessions = async (req: Request, res: Response) => {
//   try {
//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('user_id', (req as any).user.id)
//       .order('created_at', { ascending: false }); // Newest first

//     if (error) throw error;

//     res.json({ success: true, sessions: data });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to fetch sessions' });
//   }
// };


// import { Request, Response } from 'express';
// import { supabase } from '../lib/supabase';
// import { PERSONAS } from '../config/personas';

// // ✅ ADD THIS IMPORT
// import { generateAIResponse } from '../service/ai.service';

// // --------------------------------------------------
// // CREATE SESSION (unchanged)
// // --------------------------------------------------
// export const createSession = async (req: Request, res: Response) => {
//   try {
//     const { personaId } = req.body;
//     const user = (req as any).user;

//     const persona = PERSONAS.find(p => p.id === personaId);
//     if (!persona) {
//       return res.status(404).json({ error: 'Persona not found' });
//     }

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .insert({
//         user_id: user.id,
//         persona_id: persona.id,
//         title: `Chat with ${persona.name}`
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     res.status(201).json({ success: true, session: data });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // --------------------------------------------------
// // SEND MESSAGE (UPDATED — Step 3 Transplant)
// // --------------------------------------------------
// export const sendMessage = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params; // Session ID
//     const { content } = req.body; // User Message
//     const user = (req as any).user;

//     // 1. Validate Session & User
//     const { data: session, error: sessionError } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('id', id)
//       .eq('user_id', user.id)
//       .single();

//     if (sessionError || !session) {
//       res.status(404).json({ success: false, error: 'Session not found' });
//       return;
//     }

//     // 2. Fetch Previous Chat History (Context for AI)
//     const { data: historyData } = await supabase
//       .from('messages')
//       .select('role, content')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true })
//       .limit(10);

//     const chatHistory =
//       (historyData as { role: 'user' | 'assistant'; content: string }[]) || [];

//     // 3. Save USER Message
//     const { error: msgError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'user',
//         content
//       });

//     if (msgError) throw msgError;

//     // 4. GENERATE AI RESPONSE 🧠
//     const aiText = await generateAIResponse(
//       session.persona_id,
//       chatHistory,
//       content
//     );

//     // 5. Save AI Message
//     const { data: aiMsg, error: aiError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'assistant',
//         content: aiText
//       })
//       .select()
//       .single();

//     if (aiError) throw aiError;

//     // 6. Return to Frontend
//     res.json({ success: true, message: aiMsg });

//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ success: false, error: 'Failed to process message' });
//   }
// };

// // --------------------------------------------------
// // GET MESSAGES (unchanged)
// // --------------------------------------------------
// export const getMessages = async (req: Request, res: Response) => {
//   try {
//     const { sessionId } = req.params;

//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', sessionId)
//       .order('created_at', { ascending: true });

//     if (error) throw error;

//     res.json({ success: true, data });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // --------------------------------------------------
// // GET USER SESSIONS (unchanged)
// // --------------------------------------------------
// export const getUserSessions = async (req: Request, res: Response) => {
//   try {
//     const user = (req as any).user;

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('user_id', user.id)
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, sessions: data });
//   } catch (error) {
//     res.status(500).json({ success: false, error: 'Failed to fetch sessions' });
//   }
// };


// import { Request, Response } from 'express';
// import { supabase } from '../lib/supabase';
// import { PERSONAS } from '../config/personas';
// import { generateAIResponse } from '../service/ai.service'; 

// // 1. Create a New Session
// // ✅ CHANGE: 'req: any' allows us to access req.user without errors
// export const createSession = async (req: any, res: Response) => {
//   try {
//     const { personaId } = req.body;
//     // Now TypeScript won't complain about .user
//     const userId = req.user?.id; 

//     if (!userId) {
//         res.status(401).json({ error: 'Unauthorized' });
//         return;
//     }

//     // Verify Persona exists in config
//     const persona = PERSONAS.find((p) => p.id === personaId);
//     if (!persona) {
//       res.status(400).json({ error: 'Invalid persona ID' });
//       return;
//     }

//     // Insert into DB
//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .insert({
//         user_id: userId,
//         persona_id: personaId,
//         title: `${persona.name} Session`
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     res.status(201).json({ success: true, session: data });
//   } catch (error) {
//     console.error('Error creating session:', error);
//     res.status(500).json({ error: 'Failed to create session' });
//   }
// };

// // 2. Get All Sessions for Sidebar
// // ✅ CHANGE: 'req: any'
// export const getUserSessions = async (req: any, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//         res.status(401).json({ error: 'Unauthorized' });
//         return;
//     }

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, sessions: data });
//   } catch (error) {
//     console.error('Error fetching sessions:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch sessions' });
//   }
// };

// // 3. Get Messages for a Specific Session
// // ✅ CHANGE: 'req: any'
// export const getMessages = async (req: any, res: Response) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;

//     // Optional: Check if session belongs to user (Security)
//     const { data: session, error: sessionError } = await supabase
//         .from('chat_sessions')
//         .select('id')
//         .eq('id', id)
//         .eq('user_id', userId)
//         .single();
    
//     if (sessionError || !session) {
//         res.status(404).json({ success: false, error: 'Session not found' });
//         return;
//     }

//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true });

//     if (error) throw error;

//     res.json({ success: true, data });
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch messages' });
//   }
// };

// // 4. Send Message (with GEMINI AI)
// // ✅ CHANGE: 'req: any'
// export const sendMessage = async (req: any, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { content } = req.body;
//     const userId = req.user?.id;

//     // A. Validate Session
//     const { data: session, error: sessionError } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('id', id)
//       .eq('user_id', userId)
//       .single();

//     if (sessionError || !session) {
//       res.status(404).json({ success: false, error: 'Session not found' });
//       return;
//     }

//     // B. Save USER Message
//     const { error: msgError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'user',
//         content: content
//       });

//     if (msgError) throw msgError;

//     // C. Get Context (History)
//     const { data: historyData } = await supabase
//       .from('messages')
//       .select('role, content')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true })
//       .limit(10); 

//     const chatHistory = historyData as { role: 'user' | 'assistant', content: string }[] || [];

//     // D. Generate AI Reply
//     const aiText = await generateAIResponse(session.persona_id, chatHistory, content);

//     // E. Save AI Message
//     const { data: aiMsg, error: aiError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'assistant',
//         content: aiText
//       })
//       .select()
//       .single();

//     if (aiError) throw aiError;

//     res.json({ success: true, message: aiMsg });

//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({ success: false, error: 'Failed to process message' });
//   }
// };

// import { Request, Response } from 'express';
// import { supabase } from '../lib/supabase';
// import { generateAIResponse } from '../service/ai.service';

// /* =========================================================
//    CREATE CHAT SESSION
// ========================================================= */
// export const createSession = async (req: any, res: Response) => {
//   try {
//     const { personaId } = req.body;
//     const userId = req.user?.id;

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .insert({
//         user_id: userId,
//         persona_id: personaId
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     res.json({ success: true, session: data });
//   } catch (error) {
//     console.error('Error creating session:', error);
//     res.status(500).json({ success: false, error: 'Failed to create session' });
//   }
// };

// /* =========================================================
//    GET SESSION MESSAGES
// ========================================================= */
// export const getMessages = async (req: any, res: Response) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;

//     // Validate session ownership
//     const { data: session } = await supabase
//       .from('chat_sessions')
//       .select('id')
//       .eq('id', id)
//       .eq('user_id', userId)
//       .single();

//     if (!session) {
//       res.status(404).json({ success: false, error: 'Session not found' });
//       return;
//     }

//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true });

//     if (error) throw error;

//     res.json({ success: true, data });
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch messages' });
//   }
// };

// /* =========================================================
//    GET ALL USER SESSIONS (SIDEBAR)
// ========================================================= */
// export const getUserSessions = async (req: any, res: Response) => {
//   try {
//     const userId = req.user?.id;

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, sessions: data });
//   } catch (error) {
//     console.error('Error fetching sessions:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch sessions' });
//   }
// };

// /* =========================================================
//    SEND MESSAGE (TEXT + IMAGE SUPPORT)
// ========================================================= */
// export const sendMessage = async (req: any, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { content, image } = req.body; // 👈 IMAGE SUPPORT
//     const userId = req.user?.id;

//     // A. Validate Session
//     const { data: session, error: sessionError } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('id', id)
//       .eq('user_id', userId)
//       .single();

//     if (sessionError || !session) {
//       res.status(404).json({ success: false, error: 'Session not found' });
//       return;
//     }

//     // B. Save USER Message (text only for now)
//     const { error: msgError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'user',
//         content: content
//       });

//     if (msgError) throw msgError;

//     // C. Fetch Chat History (Context)
//     const { data: historyData } = await supabase
//       .from('messages')
//       .select('role, content')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true })
//       .limit(10);

//     const chatHistory =
//       (historyData as { role: 'user' | 'assistant'; content: string }[]) || [];

//     // D. Generate AI Response (PASS IMAGE)
//     const aiText = await generateAIResponse(
//       session.persona_id,
//       chatHistory,
//       content,
//       image
//     );

//     // E. Save AI Message
//     const { data: aiMsg, error: aiError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'assistant',
//         content: aiText
//       })
//       .select()
//       .single();

//     if (aiError) throw aiError;

//     res.json({ success: true, message: aiMsg });

//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to process message'
//     });
//   }
// };
// import { Request, Response } from 'express';
// import { supabase } from '../lib/supabase';
// import { generateAIResponse } from '../service/ai.service';
// import { memoryService } from '../service/memory.service'; // ✅ ADDED

// /* =========================================================
//    CREATE CHAT SESSION
// ========================================================= */
// export const createSession = async (req: any, res: Response) => {
//   try {
//     const { personaId } = req.body;
//     const userId = req.user?.id;

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .insert({
//         user_id: userId,
//         persona_id: personaId
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     res.json({ success: true, session: data });
//   } catch (error) {
//     console.error('Error creating session:', error);
//     res.status(500).json({ success: false, error: 'Failed to create session' });
//   }
// };

// /* =========================================================
//    GET SESSION MESSAGES
// ========================================================= */
// export const getMessages = async (req: any, res: Response) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;

//     const { data: session } = await supabase
//       .from('chat_sessions')
//       .select('id')
//       .eq('id', id)
//       .eq('user_id', userId)
//       .single();

//     if (!session) {
//       res.status(404).json({ success: false, error: 'Session not found' });
//       return;
//     }

//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true });

//     if (error) throw error;

//     res.json({ success: true, data });
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch messages' });
//   }
// };

// /* =========================================================
//    GET ALL USER SESSIONS (SIDEBAR)
// ========================================================= */
// export const getUserSessions = async (req: any, res: Response) => {
//   try {
//     const userId = req.user?.id;

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, sessions: data });
//   } catch (error) {
//     console.error('Error fetching sessions:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch sessions' });
//   }
// };

// /* =========================================================
//    SEND MESSAGE (TEXT + IMAGE SUPPORT)
// ========================================================= */
// export const sendMessage = async (req: any, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { content, image } = req.body;
//     const userId = req.user?.id;

//     // A. Validate Session
//     const { data: session, error: sessionError } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('id', id)
//       .eq('user_id', userId)
//       .single();

//     if (sessionError || !session) {
//       res.status(404).json({ success: false, error: 'Session not found' });
//       return;
//     }

//     // B. Save USER Message
//     const { error: msgError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'user',
//         content: content
//       });

//     if (msgError) throw msgError;

//     // 🧠 STEP 3 — ADD MEMORY (STRICTLY AS INSTRUCTION)
//     await memoryService.addMemory({
//       userId,
//       sessionId: id,
//       role: 'user',
//       content
//     });

//     // C. Fetch Chat History
//     const { data: historyData } = await supabase
//       .from('messages')
//       .select('role, content')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true })
//       .limit(10);

//     const chatHistory =
//       (historyData as { role: 'user' | 'assistant'; content: string }[]) || [];

//     // D. Generate AI Response
//     const aiText = await generateAIResponse(
//       session.persona_id,
//       chatHistory,
//       content,
//       image
//     );

//     // E. Save AI Message
//     const { data: aiMsg, error: aiError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'assistant',
//         content: aiText
//       })
//       .select()
//       .single();

//     if (aiError) throw aiError;

//     res.json({ success: true, message: aiMsg });

//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to process message'
//     });
//   }
// };


// import { Request, Response } from 'express';
// import { supabase } from '../lib/supabase';
// import { generateAIResponse } from '../service/ai.service';
// import { memoryService } from '../service/memory.service'; // ✅ ADDED

// /* =========================================================
//    CREATE CHAT SESSION
// ========================================================= */
// export const createSession = async (req: any, res: Response) => {
//   try {
//     const { personaId } = req.body;
//     const userId = req.user?.id;

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .insert({
//         user_id: userId,
//         persona_id: personaId
//       })
//       .select()
//       .single();

//     if (error) throw error;

//     res.json({ success: true, session: data });
//   } catch (error) {
//     console.error('Error creating session:', error);
//     res.status(500).json({ success: false, error: 'Failed to create session' });
//   }
// };

// /* =========================================================
//    GET SESSION MESSAGES
// ========================================================= */
// export const getMessages = async (req: any, res: Response) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user?.id;

//     const { data: session } = await supabase
//       .from('chat_sessions')
//       .select('id')
//       .eq('id', id)
//       .eq('user_id', userId)
//       .single();

//     if (!session) {
//       res.status(404).json({ success: false, error: 'Session not found' });
//       return;
//     }

//     const { data, error } = await supabase
//       .from('messages')
//       .select('*')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true });

//     if (error) throw error;

//     res.json({ success: true, data });
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch messages' });
//   }
// };

// /* =========================================================
//    GET ALL USER SESSIONS (SIDEBAR)
// ========================================================= */
// export const getUserSessions = async (req: any, res: Response) => {
//   try {
//     const userId = req.user?.id;

//     const { data, error } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     res.json({ success: true, sessions: data });
//   } catch (error) {
//     console.error('Error fetching sessions:', error);
//     res.status(500).json({ success: false, error: 'Failed to fetch sessions' });
//   }
// };

// /* =========================================================
//    SEND MESSAGE (TEXT + IMAGE SUPPORT)
// ========================================================= */
// export const sendMessage = async (req: any, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;
//     const { content, image } = req.body;
//     const userId = req.user?.id;

//     // A. Validate Session
//     const { data: session, error: sessionError } = await supabase
//       .from('chat_sessions')
//       .select('*')
//       .eq('id', id)
//       .eq('user_id', userId)
//       .single();

//     if (sessionError || !session) {
//       res.status(404).json({ success: false, error: 'Session not found' });
//       return;
//     }

//     // B. Save USER Message
//     const { error: msgError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'user',
//         content: content
//       });

//     if (msgError) throw msgError;

//     // 🧠 STEP 3 — ADD MEMORY (STRICTLY AS INSTRUCTION)
//     // memoryService.addMemory(userId, content, {
//     //   sessionId: id,
//     //   role: 'user'
//     // }).catch(err => console.error('[Memory] Background save failed:', err));
//     memoryService.addMemory(
//       userId, 
//       session.persona_id, // 👈 KEY FIX: Passing the persona ID
//       content, 
//       {
//         sessionId: id,
//         role: 'user'
//       }
//     ).catch(err => console.error('[Memory] Background save failed:', err));

//     // C. Fetch Chat History
//     const { data: historyData } = await supabase
//       .from('messages')
//       .select('role, content')
//       .eq('session_id', id)
//       .order('created_at', { ascending: true })
//       .limit(10);

//     const chatHistory =
//       (historyData as { role: 'user' | 'assistant'; content: string }[]) || [];

//     // D. Generate AI Reply (Now with MEMORY)
//     const aiText = await generateAIResponse(
//       session.persona_id,
//       chatHistory,
//       content,
//       userId, // 👈 PASS THIS (as instructed)
//       image   // 👈 Image is now the 5th argument
//     );

//     // E. Save AI Message
//     const { data: aiMsg, error: aiError } = await supabase
//       .from('messages')
//       .insert({
//         session_id: id,
//         role: 'assistant',
//         content: aiText
//       })
//       .select()
//       .single();

//     if (aiError) throw aiError;

//     res.json({ success: true, message: aiMsg });

//   } catch (error) {
//     console.error('Error sending message:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to process message'
//     });
//   }
// };


import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';
import { generateAIResponse } from '../service/ai.service';
import { memoryService } from '../service/memory.service'; // ✅ ADDED

/* =========================================================
   CREATE CHAT SESSION
========================================================= */
export const createSession = async (req: any, res: Response) => {
  try {
    const { personaId } = req.body;
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        user_id: userId,
        persona_id: personaId
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, session: data });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ success: false, error: 'Failed to create session' });
  }
};

/* =========================================================
   GET SESSION MESSAGES
========================================================= */
export const getMessages = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const { data: session } = await supabase
      .from('chat_sessions')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (!session) {
      res.status(404).json({ success: false, error: 'Session not found' });
      return;
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
};

/* =========================================================
   GET ALL USER SESSIONS (SIDEBAR)
========================================================= */
export const getUserSessions = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, sessions: data });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch sessions' });
  }
};

/* =========================================================
   SEND MESSAGE (TEXT + IMAGE SUPPORT)
========================================================= */
export const sendMessage = async (req: any, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content, image } = req.body;
    const userId = req.user?.id;

    // A. Validate Session
    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (sessionError || !session) {
      res.status(404).json({ success: false, error: 'Session not found' });
      return;
    }

    // B. Save USER Message
    const { error: msgError } = await supabase
      .from('messages')
      .insert({
        session_id: id,
        role: 'user',
        content: content
      });

    if (msgError) throw msgError;

    // 🧠 STEP 3 - ADD MEMORY (ISOLATED)
    // We pass 3 args: UserId, PersonaId, Content
    memoryService.addMemory(
      userId,
      session.persona_id, // 👈 Passing the ID to lock it to this persona
      content,
      {
        sessionId: id,
        role: 'user'
      }
    ).catch(err => console.error('[Memory] Background save failed:', err));

    // C. Fetch Chat History
    const { data: historyData } = await supabase
      .from('messages')
      .select('role, content')
      .eq('session_id', id)
      .order('created_at', { ascending: true })
      .limit(10);

    const chatHistory =
      (historyData as { role: 'user' | 'assistant'; content: string }[]) || [];

    // D. Generate AI Reply (Now with MEMORY)
    const aiText = await generateAIResponse(
      session.persona_id,
      chatHistory,
      content,
      userId,
      image
    );

    // E. Save AI Message
    const { data: aiMsg, error: aiError } = await supabase
      .from('messages')
      .insert({
        session_id: id,
        role: 'assistant',
        content: aiText
      })
      .select()
      .single();

    if (aiError) throw aiError;

    res.json({ success: true, message: aiMsg });

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message'
    });
  }
};
