import bcrypt from 'bcrypt';
import User from '../models/users.js';

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
        res.status(200).json({ message: 'Prihlásenie úspešné', user });
    } catch (error) {
        res.status(500).json({ message: 'Chyba pri prihlásení', error });
    }
}