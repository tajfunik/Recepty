import express from 'express';
import { getallUsers, createUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

//Get endpoint na ziskanie vsetkych userov z databazy
router.get('/users', getallUsers)

// POST endpoint na registráciu nového užívateľa
router.post('/users', createUser); 

//Delete endpoint na vymazanie usera na zaklade jeho ID
router.delete('/users/:id', deleteUser)

export default router;