import express from 'express';
import { createUser } from '../controllers/userController.js';

const router = express.Router();

// POST endpoint na registráciu nového užívateľa
router.post('/users', createUser); 

export default router;