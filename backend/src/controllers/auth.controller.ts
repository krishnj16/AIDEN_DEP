// import { Request, Response } from 'express';
// import { supabase } from '../lib/supabase';

// export const signup = async (req: Request, res: Response) => {
//   const { email, password, full_name } = req.body;

//   if (!email || !password) return res.status(400).json({ error: 'Missing email or password' });

//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: { full_name } 
//     }
//   });

//   if (error) return res.status(400).json({ error: error.message });
//   return res.status(201).json({ message: 'User created', user: data.user });
// };

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const { data, error } = await supabase.auth.signInWithPassword({
//     email,
//     password
//   });

//   if (error) return res.status(401).json({ error: error.message });

//   return res.status(200).json({ 
//     message: 'Login successful', 
//     session: data.session 
//   });
// };


import { Request, Response } from 'express';
import { supabase } from '../lib/supabase';

export const signup = async (req: Request, res: Response) => {
  // 1. Extract data
  const { email, password, full_name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  // 2. CLEAN THE INPUT (Fixes "Invalid Email" error)
  const cleanEmail = email.trim();

  // 3. Create the Authentication User
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
    options: {
      data: { full_name } 
    }
  });

  if (authError) return res.status(400).json({ error: authError.message });

  // 4. MANUALLY CREATE PROFILE (Since we deleted the SQL trigger)
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: authData.user.id, 
          email: cleanEmail, 
          full_name: full_name 
        }
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // We don't stop the request here, but we log it.
    }
  }

  return res.status(201).json({ message: 'User created', user: authData.user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(), // Clean this too
    password
  });

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json({ 
    message: 'Login successful', 
    session: data.session 
  });
};