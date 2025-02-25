import express from 'express';

const app = express();
const PORT = 3000;

// Importovanie mongoose
import mongoose from 'mongoose';

//importovanie funkcii z Routes
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js'

app.use(express.static('public')) // Spracovanie vsetkych statickych suborov v "public" adresari
app.use(express.json());  // Middleware na spracovanie JSON




/*----------------------------------------Spustenie databazy-------------------------------- */

// Pripojenie k MongoDB
const uri = 'mongodb://localhost:27017/recepty';  // adresa k tvojej lokálnej databáze

// Pripojenie pomocou mongoose
mongoose.connect(uri)
  .then(() => {console.log('Pripojenie k MongoDB úspešné!');
  })
  .catch((err) => {console.log('Chyba pri pripojení k MongoDB:', err);
  });


// Používame route pre vytvorene kolekcie (recepty, users)
app.use('/api', recipeRoutes);
app.use('/api', userRoutes)
;

// Pridanie routy pre domovskú stránku
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' }); // Odošli index.html súbor z adresára public
});

// Pridanie routy pre login
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' }); // Odošli login.html súbor z adresára public
});


//  Spustenie servera
app.listen(PORT, () => {
  console.log(`Server beží na http://localhost:${PORT}`);
});

