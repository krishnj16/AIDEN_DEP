import { Request, Response } from 'express';
import { PERSONAS } from '../config/personas';

export const getPersonas = (req: Request, res: Response) => {
  try {
    const publicData = PERSONAS.map(p => ({
      id: p.id,
      name: p.name,
      role: p.role,
      description: p.description,
      icon: (p as any).icon, 
  theme: (p as any).theme
    }));

    res.status(200).json({
      success: true,
      count: publicData.length,
      data: publicData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createPersona = (req: Request, res: Response) => {
  res.status(501).json({ message: 'Not implemented yet' });
};