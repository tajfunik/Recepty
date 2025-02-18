import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.static('public')) // Spracovanie vsetkych statickych suborov v "public" adresari
app.use(express.json());  // Middleware na spracovanie JSON


/*----------------------------------------Spustenie databazy-------------------------------- */
// Importovanie mongoose
import mongoose from 'mongoose';
import Recept from './models/recept.js'; // Import modelu

// Pripojenie k MongoDB
const uri = 'mongodb://localhost:27017/recepty';  // adresa k tvojej lokálnej databáze

// Pripojenie pomocou mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Pripojenie k MongoDB úspešné!');
  })
  .catch((err) => {
    console.log('Chyba pri pripojení k MongoDB:', err);
  });





/*-------------------------------------------------Praca s URL cez API---------------------------------------------- */
// API endpoint na získanie údajov z URL adresy localhost:3000/recepty
app.get('/recepty', async (req, res) => {
    try {
      const recepty = await Recept.find(); // Načíta všetky recepty z databázy
      res.status(200).json(recepty);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Chyba pri načítaní receptov' });
    }
  });


//POST request na vytvorenie receptu a pridanie do zoznamu receptov
app.post('/recepty', async (req, res) => {
    try {
      const { category, title, ingredients, jednotlive_kroky, obrazok } = req.body;
  
      const recept = new Recept({
        category,
        title,
        ingredients,
        jednotlive_kroky,
        obrazok,
      });
  
      await recept.save(); // Uloží recept do databázy
      res.status(201).json({ message: 'Recept bol úspešne pridaný!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Chyba pri pridávaní receptu' });
    }
  });



//Osetrenie API endpointu ak zadame zlu URL adresu
app.get('*', (req, res) => {
    res.json({ message: `Upsss! Zadana URL adresa je nespravna` });
});
//  Spustenie servera
app.listen(PORT, () => {
    console.log(`Server beží na http://localhost:${PORT}`);
});