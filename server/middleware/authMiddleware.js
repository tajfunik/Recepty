// Importujeme jwt knižnicu
import jwt from 'jsonwebtoken';  

// Middleware na overenie tokenu
const authenticateToken = (req, res, next) => {
    // Skúsime získať token z hlavičky požiadavky (v prípade, že je odoslaný ako "Bearer token")
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        // Ak token nie je prítomný, odpovieme 401 (Unauthorized)
        return res.status(401).json({ message: 'Prístup zamietnutý: chýba token.' });
    }

    // Overíme token s pomocou našej tajnej kľúče
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Ak je token neplatný, odpovieme 403 (Forbidden)
            return res.status(403).json({ message: 'Neplatný token.' });
        }

        req.user = user; // Uložíme informácie o používateľovi do požiadavky (request), aby sa s nimi dalo ďalej pracovať
        next();  // Ak je všetko v poriadku, pokračujeme do ďalšej časti spracovania požiadavky
    });
};

export default authenticateToken; 