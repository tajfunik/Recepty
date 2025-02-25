import User from '../models/users.js';

export const createUser = async (req, res) => {
    const { meno, heslo } = req.body;

    try {
        const newUser = new User({ meno, heslo });
        await newUser.save(); // Ulož užívateľa do databázy
        res.status(201).json({ message: 'User bol úspešne pridaný', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Chyba pri pridávaní užívateľa', error });
    }
};