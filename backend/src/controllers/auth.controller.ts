import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const signup = async (req: Request, res: Response) => {
  const { email, password, full_name } = req.body;

  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name } 
    }
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ message: 'User created', user: data.user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json({ 
    message: 'Login successful', 
    session: data.session 
  });
};