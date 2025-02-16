const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public')) // Spracovanie vsetkych statickych suborov v "public" adresari
app.use(express.json());  // Middleware na spracovanie JSON


let recepies = []

// API endpoint na získanie údajov z URL adresy localhost:3000/recepty
app.get('/recepty', (req, res) => {
    res.json(recepies)
    //res.json({ message: "Ahoj! Toto je odpoveď zo servera. Mal by si vidiet zoznam vsetkych receptov" });
});



app.post('/recepty', (req, res) => {
    const newRecipe = req.body;  // Dáta poslané klientom (obsah POST požiadavky)
    console.log("Prijaté dáta:", newRecipe);  // Môžeš si ich vypísať v konzole

    // Tu môžeš spracovať dáta, uložiť ich do databázy atď.
    recepies.push(newRecipe)
    console.log(`Novy recept bol pridany k ostatnym`)
    res.status(201).json({ message: "Recept bol pridany!", recipe: newRecipe });
});



//Osetrenie API endpointu ak zadame zlu URL adresu
app.get('*', (req, res) => {
    res.json({ message: `Upsss! Zadana URL adresa je nespravna` });
});
//  Spustenie servera
app.listen(PORT, () => {
    console.log(`Server beží na http://localhost:${PORT}`);
});