// /server/controllers/recipeController.js
import Recipe from '../models/recept.js';

// Vytvorenie nového receptu
export const createRecipe = async (req, res) => {
    try {
        const { category, title, ingredients, jednotlive_kroky, obrazok } = req.body;

        const newRecipe = new Recipe({ category, title, ingredients, jednotlive_kroky, obrazok });

        // Uloženie do databázy
        //Keď zavoláš newRecipe.save();, Mongoose vie, že newRecipe je inštancia modelu Recept, a tak sa uloží do kolekcie recepty
        await newRecipe.save(); 
        res.status(201).json({ message: 'Recept bol úspešne pridaný!', recipe: newRecipe });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chyba pri pridávaní receptu.' });
    }
};

// Získanie všetkých receptov
export const getAllRecipes = async (req, res) => {
    try {

        // Získanie všetkých receptov z databázy
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chyba pri získavaní receptov.' });
    }
};

//Zmazanie receptu na zaklade jeho ID
export const deleteRecipe = async (req, res) => {
    try{
        const {id} = req.params
        //najdenie daneho receptu v databaze podla ID
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recept nenájdený.' });
        }
        res.status(200).json({ message: 'Recept bol úspešne vymazaný.', recipe: deletedRecipe });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Chyba pri mazani receptov.' });
    }
};