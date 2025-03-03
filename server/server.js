import express from 'express';
const app = express();
const PORT = 3000;

// Importovanie mongoose pre databazu
import mongoose from 'mongoose';

//importovanie funkcii z Routes
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js'
import middlewareRoutes from './routes/authMiddlewareRoutes.js'

// Spracovanie vsetkych statickych suborov v "public" adresari
app.use(express.static('public')) 
// Middleware na spracovanie JSON
app.use(express.json());  



/*----------------------------------------Spustenie mongoDB databazy-------------------------------- */

// Pripojenie k MongoDB
const uri = 'mongodb://localhost:27017/recepty';  // adresa k tvojej lokálnej databáze

// Pripojenie pomocou mongoose
mongoose.connect(uri)
  .then(() => {console.log('Pripojenie k MongoDB úspešné!');
  })
  .catch((err) => {console.log('Chyba pri pripojení k MongoDB:', err);
  });


/*----------------------------------------Mapovanie na konkretne routes-------------------------------- */
// Používame route pre vytvorene kolekcie (recepty, users)
app.use('/api', recipeRoutes);
app.use('/api', userRoutes);
app.use('/api', middlewareRoutes)


/*----------------------------------------Pridavanie jednotlivych URL adries-------------------------------- */
// Pridanie routy pre domovskú stránku
// Odošli index.html súbor z adresára public
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' }); 
});

// Pridanie routy pre login
// Odošli login.html súbor z adresára public
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' }); 
});
// Pridanie routy pre Registraciu
// Odošli registracia.html súbor z adresára public
app.get('/registracia', (req, res) => {
  res.sendFile('registracia.html', { root: 'public' }); 
});



//osetrenie na vsetky ine mozne zadane URL adresy na ktore nemame urobene konkretne routy
app.use('*', (req, res) => {
  res.status(404).send({message: `Upsss!! Zle zadana URL adresa, prosim skontrolujte si ju`})
})

// Spustenie servera
app.listen(PORT, () => {
  console.log(`Server beží na http://localhost:${PORT}`);
});

