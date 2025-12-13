import { Router } from 'express';
import { getPersonas, createPersona } from '../controllers/persona.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();
router.use(requireAuth);

router.get('/', getPersonas);
router.post('/', createPersona);

export default router;