
const listOfRecepies = document.querySelector('.list-of-recepts')
const selectedReceptTitle = document.querySelector('.detail-title')
const selectedReceptImg =  document.querySelector('.detail-img')
const selectedReceptIngredients = document.querySelector('.detail-ingredients')
const selectedReceptSteps =  document.querySelector('.detail-steps')

import { recepty } from '../vsetkyRecepty.js';


//Funkcia ktora nam zobrazuje recepty z casti "Nase recepty"
//zavolame ju po kliknuti konkretnej kategorie
function zobrazRecepty(array){
    listOfRecepies.innerHTML = ""
    if(!array || array.length === 0) {
        console.log(`Neboli najdene ziadne jedla v tejto kategorii`)
        return
    }
    array.forEach((recept) => {
        const receptDiv = document.createElement('div');
        receptDiv.classList.add('recept');
        receptDiv.innerHTML = `
            <div class="recept-left">
                <img src="${recept.obrazok}" alt="Obrazok nenajdeny">
            </div>
            <div class="recept-right">
                <h3>${recept.title}</h3>
                <p>${recept.popis}</p>
            </div>`;

        listOfRecepies.appendChild(receptDiv);
    });
}
//Osetrenie ak kliknem na "a" element aby nas nehadzalo na zaciatok stranky
//Zobrazenie hodnoty daneho "a" elementu
//Zavolanie funkcie na zobrazenie receptov podla "kategorie"
document.querySelectorAll('.recepty-kategorie').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Zabrání presmerovaniu na začiatok stránky
        
        const kategoria = this.textContent.trim(); // Získa názov kategórie (napr. "Raňajky")
        let listNajdenych = recepty.filter((recept) => recept.category.toLowerCase() === kategoria.toLowerCase())
        zobrazRecepty(listNajdenych)
    });
});
    
// Kliknutim na dany Recept sa nam zobrazi vpravo + vsetky informacie k nemu
// Event listnerom "click" handlujeme vsetky objekty v zozname receptov
listOfRecepies.addEventListener('click', function(event) {
    const clickedRecept = event.target.closest('.recept'); // Nájde najbližší .recept

    if (!clickedRecept) return; // Ak neklikol na recept, nič sa nestane
    // Získanie názvu receptu
    const title = clickedRecept.querySelector('h3').textContent.trim();
    // Nájdeme recept podľa názvu v zozname
    const recept = recepty.find(r => r.title === title);

    if (recept) {
        selectedReceptTitle.textContent = recept.title;
        selectedReceptImg.src = recept.obrazok;
        selectedReceptIngredients.textContent = `Ingrediencie su: ${recept.ingredients}`;
        selectedReceptSteps.textContent = `Postup receptu: ${recept.jednotlive_kroky}`;
    }
});



//---------------------------------------------------Komunikacia s databazou, pridavanie objektov do databazy
// Definícia modelu pre recepty
// 1. Pridáme event listener na formulár, aby sme zachytili jeho odoslanie.
document.getElementById("recipe-form").addEventListener("submit", function(event) {
    // 2. Zabránime predvolenému správaniu (poslanie formulára a obnovenie stránky).
    event.preventDefault();

    // 3. Získame hodnoty z formulára pomocou document.querySelector()
    const title = document.querySelector("#title").value;  // Získame hodnotu z inputu pre názov receptu
    const category = document.querySelector("#category").value;  // Získame hodnotu z inputu pre kategóriu
    const ingredients = document.querySelector("#ingredients").value;  // Získame ingrediencie z textarea
    const steps = document.querySelector("#steps").value;  // Získame postup receptu z textarea
    const image = document.querySelector("#image").value;  // Získame obrázok (voliteľný) z inputu

    // 4. Vytvoríme objekt s dátami
    const recipeData = {
        title: title,
        category: category,
        ingredients: ingredients,
        steps: steps,
        image: image,
    };

    // 5. Posielame dáta na server cez fetch API
    fetch("/api/recipes", {  // URL, na ktorú posielame požiadavku
        method: "POST",  // Používame metódu POST, pretože chceme vytvoriť nový záznam
        headers: {
            "Content-Type": "application/json",  // Posielame dáta v JSON formáte
        },
        body: JSON.stringify(recipeData),  // Prevod objektu na JSON
    })
    .then(response => response.json())  // Čakáme na odpoveď zo servera a parsujeme ju ako JSON
    .then(data => {
        console.log("Recept bol pridaný:", data);  // Úspešná odpoveď zo servera
    })
    .catch(error => {
        console.error("Chyba pri pridávaní receptu:", error);  // Ošetrenie chyby
    });
});














/*
//táto funkcia slúži na načítanie údajov z backendu hneď po načítaní stránky.
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/recepty'); // Pošle GET požiadavku na backend
        const data = await response.json();
        document.getElementById("message").textContent = data.message; // Vloží správu do stránky
    } catch (error) {
        console.error("Chyba pri načítaní dát:", error);
    }
});
*/