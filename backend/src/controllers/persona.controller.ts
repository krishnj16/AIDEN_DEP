import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const getPersonas = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const { data, error } = await supabase
    .from('personas')
    .select('*')
    .eq('user_id', user.id) 
    .order('created_at', { ascending: true });

  if (error) return res.status(400).json({ error: error.message });
  
  return res.status(200).json(data);
};

export const createPersona = async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { name, description, system_prompt, icon, voice_id } = req.body;

  if (!name || !system_prompt) {
    return res.status(400).json({ error: 'Name and System Prompt are required' });
  }

  const { data, error } = await supabase
    .from('personas')
    .insert([
      {
        user_id: user.id, 
        name,
        description,
        system_prompt,
        icon,
        voice_id
      }
    ])
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });

  return res.status(201).json(data);
};