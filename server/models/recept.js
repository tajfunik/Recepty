import mongoose from 'mongoose';

// Definovanie schémy pre recept
const receptSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  jednotlive_kroky: {
    type: String,
    required: true,
  },
  obrazok: {
    type: String,
    required: true,
  },
});

// Vytvorenie modelu z definovanej schémy
//Mongoose automaticky vytvorí názov kolekcie v množnom čísle a v malých písmenách z názvu modelu
//V tomto pripade nam v databaze vytvori z "Recept" = "recepty"
const Recept = mongoose.model('Recept', receptSchema);

export default Recept;