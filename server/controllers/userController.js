import bcrypt from 'bcrypt';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

//Vypiseme vsetkych userov v nasej databaze
//Pouzivame nato GET request v Postmanovi
export const getallUsers = async (req, res) =>{
    try {
        // Získanie všetkých Userov z databázy
        const allUsers = await User.find({}, '-heslo'); // Vyber všetkých používateľov a vynechaj heslo

        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chyba pri získavaní userov z databazy.' });
    }
}

//Funkcia na zmenu udajov daneho usera na zaklade jeho ID
// Získaš údaje na aktualizáciu z tela požiadavky
// Kontrola spravneho formatu, napr. pre birthdate
export const getUserByID = async (req, res) => {
    const { id } = req.params; 
    const updatedData = req.body; 

    // Validácia dátumu narodenia (ak existuje)
    if (updatedData.birthdate) {
        const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regex na formát YYYY-MM-DD
        if (!birthdateRegex.test(updatedData.birthdate)) {
            return res.status(400).json({ message: 'Neplatný formát dátumu narodenia. Formát musí byť YYYY-MM-DD.' });
        }
    }

    try {
        // Aktualizácia používateľa podľa ID
        const changedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true, // Vráti aktualizovaný dokument po aktualizácii
            runValidators: true, // Overí validáciu modelu pri aktualizácii
        });

        if(changedUser){
            res.status(200).json({message: `Uzivatel bol updejtnuty`})
            return
        } else {
            res.status(404).json({ message: 'Uzivatel nenájdený.' });
        }

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: 'Chyba pri získavaní userov z databazy.' });
    }
}

//Funkcia na vytvorenie noveho usera v Registracnom formulari
//Kontrola spravneho tvaru emailu
//Zasehovanie hesla 
//Ulozenie do databazy
export const createUser = async (req, res) => {
    const { meno, email,  heslo } = req.body;
    const saltRounds = 10;  // Počet opakovaní hashovania

    try {
        // Skontrolovať, či meno a heslo sú zadané
        if (!meno || !email || !heslo) {
            return res.status(400).json({ message: 'Vyplňte všetky polia.' });
        }
        //Kontrola ci format emailu je spravny
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Neplatný formát emailu.' });
        }

        // Hashovanie hesla
        const hashedPassword = await bcrypt.hash(heslo, saltRounds);

        // Vytvorenie nového používateľa s hashovaným heslom
        const newUser = new User({ meno, email, heslo: hashedPassword });
        // Ulož užívateľa do databázy
        await newUser.save(); 
        res.status(201).json({ message: 'User bol úspešne pridaný', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Chyba pri pridávaní užívateľa', error });
    }
};

//Vymazaie usera na zaklade ID
//Pouzivame nato POST request v Postmanovi
export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try{
        const deletedUser = await User.findByIdAndDelete(id);

        if(deletedUser){
            return res.status(200).json({message: `Uzivatel uspesne vymazany`, deletedUser})
        } else {
            res.status(404).json({ message: 'Uzivatel nenájdený.' });
        }

    } catch(error) {
        res.status(400).json({message: `Uzivatel nenajdeny, prosim skuste pouzit ine ID`, error})
    }
}

//Kontrola pouzivatela v Login formulari
//Vytiahneme si uzivatela na zaklademena z nasej zadabazy
//Kontrola hesla
//Generovanie JWT tokenu a jeho vratenie
export const checkUserOnLogin = async (req, res) => {
    const { meno, heslo } = req.body;
    try {
        const user = await User.findOne({ meno });
        if (!user) {
            return res.status(404).json({ message: 'Užívateľ nenájdený' });
        }
        // Porovnanie hesiel
        const isMatch = await bcrypt.compare(heslo, user.heslo);

        if (!isMatch) {
            return res.status(401).json({ message: 'Nesprávne heslo' });
        }

        // Generovanie JWT tokenu
        const token = jwt.sign({ id: user._id, meno: user.meno }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Vrátenie tokenu a používateľských údajov
        res.json({ token, user: { meno: user.meno } });

    } catch (error) {
        res.status(500).json({ message: 'Chyba pri prihlásení', error });
    }
}