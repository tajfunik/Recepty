import express from 'express';
import { getallUsers, getUserByID, createUser, deleteUser, checkUserOnLogin } from '../controllers/userController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

//GET endpoint na ziskanie vsetkych userov z databazy
router.get('/users', authenticateToken, getallUsers)

//PATCH endpoint na najdenie usera na zaklade ID a jeho upravu
router.patch('/users/:id', authenticateToken, getUserByID)

// POST endpoint na registráciu nového užívateľa
router.post('/users', createUser); 

//Delete endpoint na vymazanie usera na zaklade jeho ID
router.delete('/users/:id', deleteUser)

// Prihlásenie používateľa
router.post('/login', checkUserOnLogin);


export default router;