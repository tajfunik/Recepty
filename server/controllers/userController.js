import User from '../models/users.js';


export const getallUsers = async (req, res) =>{
    try {
        // Získanie všetkých Userov z databázy
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chyba pri získavaní userov z databazy.' });
    }
}

export const createUser = async (req, res) => {
    const { meno, heslo } = req.body;

    try {
        const newUser = new User({ meno, heslo });
        // Ulož užívateľa do databázy
        await newUser.save(); 
        res.status(201).json({ message: 'User bol úspešne pridaný', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Chyba pri pridávaní užívateľa', error });
    }
};

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