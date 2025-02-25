import mongoose from 'mongoose';

// Definovanie schémy pre usera
const userSchema = new mongoose.Schema({
    meno: { type: String, required: true },
    heslo: { type: String, required: true },
});

// Vytvorenie modelu z definovanej schémy
//Mongoose automaticky vytvorí názov kolekcie v množnom čísle a v malých písmenách z názvu modelu
//V tomto pripade nam v databaze vytvori z "Recept" = "users"
const User = mongoose.model('user', userSchema);

export default User;