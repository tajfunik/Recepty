import express from 'express';
import User from '../models/users.js'; // Importuj User model

const router = express.Router();

// POST endpoint na registráciu nového užívateľa
router.post('/users', async (req, res) => {
    const { meno, heslo } = req.body;

    try {
        // Vytvor nového užívateľa
        const newUser = new User({ meno, heslo });
        await newUser.save(); // Ulož užívateľa do databázy

        res.status(201).json({ message: 'User bol úspešne pridaný', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Chyba pri pridávaní užívateľa', error });
    }
});

export default router;