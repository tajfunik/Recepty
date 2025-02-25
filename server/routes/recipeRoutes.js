// /server/routes/recipeRoutes.js
import express from 'express';
import { createRecipe, getAllRecipes, deleteRecipe } from '../controllers/recipeController.js';

const router = express.Router();

// POST endpoint na pridanie nového receptu
router.post('/recepty', createRecipe);

// GET endpoint na získanie všetkých receptov
router.get('/recepty', getAllRecipes);

//DELETE enpoint na mazanie receptov podla ID
router.delete('/recepty/:id', deleteRecipe)

export default router;