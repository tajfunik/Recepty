import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/login', authenticateToken, (req, res) => {
    res.json({ message: 'Toto je chránená route.' });
})

export default router