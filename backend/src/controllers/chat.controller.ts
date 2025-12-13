import { Request, Response } from 'express';
import { supabase } from '../lib/supabase'; // Ensure you have this file from Day 7
import { PERSONAS } from '../config/personas';

// 1. Create a New Chat Session
export const createSession = async (req: Request, res: Response) => {
  try {
    const { personaId } = req.body;
    const user = (req as any).user;

    // Validate if Persona exists in our config
    const persona = PERSONAS.find(p => p.id === personaId);
    if (!persona) {
      return res.status(404).json({ error: 'Persona not found' });
    }

    // Create session in Supabase
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        user_id: user.id,
        persona_id: persona.id,
        title: `Chat with ${persona.name}`
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, session: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Send a Message (User speaks -> AI echoes back for now)
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { content } = req.body;
    const user = (req as any).user;

    // A. Verify ownership of the session
    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single();

    if (sessionError || !session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // B. Save User Message to DB
    await supabase.from('messages').insert({
      session_id: sessionId,
      role: 'user',
      content: content
    });

    // C. Generate "AI" Response (Mock logic for today)
    // We look up who the persona is from our Config file
    const currentPersona = PERSONAS.find(p => p.id === session.persona_id);
    
    // Simple logic to prove the server knows who it is
    const aiResponseText = `[${currentPersona?.name}]: I heard you say "${content}". (AI Integration coming soon!)`;

    // D. Save AI Response to DB
    const { data: aiMessage, error: msgError } = await supabase
      .from('messages')
      .insert({
        session_id: sessionId,
        role: 'assistant',
        content: aiResponseText
      })
      .select()
      .single();

    if (msgError) throw msgError;

    res.json({ success: true, message: aiMessage });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get Chat History
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const user = (req as any).user;

    // Check permissions via RLS policy implicitly, but good to check session ownership
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true }); // Oldest first

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};