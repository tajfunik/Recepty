import express from 'express';
const app = express();
const PORT = 3000;

// Importovanie mongoose pre databazu
import mongoose from 'mongoose';

//importovanie funkcii z Routes
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js'

//importovanie middleware-ov
import loggerMiddleware from './middleware/logMiddleware.js'
import authMiddleware from './middleware/authMiddleware.js'

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

app.use(loggerMiddleware)
app.use('login', authMiddleware)


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

app.get('/registracia', (req, res) => {
  res.sendFile('registracia.html', { root: 'public' }); 
});


// Spustenie servera
app.listen(PORT, () => {
  console.log(`Server beží na http://localhost:${PORT}`);
});

