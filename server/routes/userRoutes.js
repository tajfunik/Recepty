import express from 'express';
import { getallUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

//Get endpoint na ziskanie vsetkych userov z databazy
router.get('/users', getallUsers)

// POST endpoint na registráciu nového užívateľa
router.post('/users', createUser); 

export default router;