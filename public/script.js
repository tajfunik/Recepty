
const listOfRecepies = document.querySelector('.list-of-recepts')
const selectedReceptTitle = document.querySelector('.detail-title')
const selectedReceptImg =  document.querySelector('.detail-img')
const selectedReceptIngredients = document.querySelector('.detail-ingredients')
const selectedReceptSteps =  document.querySelector('.detail-steps')



//Odhlasenie sa 
document.getElementById('logout-btn').addEventListener("click", function(){
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
})

//Nastavenie mena "User" v headri prihlaseneho uzivatela 
//Nacitavame si ho z localStorage kde sme si ho ulozili pocas prihlasenia
window.addEventListener("load", () => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        document.getElementById("logged-in-user").textContent = user;
    }
});


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
        let listNajdenych = recipes.filter((recept) => recept.category.toLowerCase() === kategoria.toLowerCase())
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
    const recept = recipes.find(r => r.title === title);

    if (recept) {
        selectedReceptTitle.textContent = recept.title;
        selectedReceptImg.src = recept.obrazok;
        selectedReceptIngredients.textContent = `Ingrediencie su: ${recept.ingredients}`;
        selectedReceptSteps.textContent = `Postup receptu: ${recept.jednotlive_kroky}`;
    }
});



//---------------------------------------------------Posielanie dat na server cez Fetch--------------------------------
// Definícia modelu pre recepty
// 1. Pridáme event listener na formulár, aby sme zachytili jeho odoslanie.
document.getElementById("recipe-form").addEventListener("submit", function(event) {
    // 2. Zabránime predvolenému správaniu (poslanie formulára a obnovenie stránky).
    event.preventDefault();

    // 3. Získame hodnoty z formulára pomocou document.querySelector()
    const categoryForm = document.querySelector("#category").value;  // Získame hodnotu z inputu pre kategóriu
    const titleForm = document.querySelector("#title").value;  // Získame hodnotu z inputu pre názov receptu
    const ingredientsForm = document.querySelector("#ingredients").value;  // Získame ingrediencie z textarea
    const jednotlive_krokyForm = document.querySelector("#steps").value;  // Získame postup receptu z textarea
    const imageForm = document.querySelector("#image").value;  // Získame obrázok (voliteľný) z inputu

    // 4. Vytvoríme objekt s dátami do ktoreho vlozime nami vytiahnute data z formulara v predchadzajucom kroku
    const newRecipeData = {
        category: categoryForm,
        title: titleForm,
        ingredients: ingredientsForm,
        jednotlive_kroky: jednotlive_krokyForm,
        image: imageForm,
    };

    // 5. Posielame dáta O novom Recepte na server zo stranky cez fetch API
    fetch("/api/recepty", {  // URL, na ktorú posielame požiadavku
        method: "POST",  // Používame metódu POST, pretože chceme vytvoriť nový záznam
        headers: {
            "Content-Type": "application/json",  // Posielame dáta v JSON formáte
        },
        body: JSON.stringify(newRecipeData),  // Prevod objektu na JSON
    })
    .then(response => response.json())  // Čakáme na odpoveď zo servera a parsujeme ju ako JSON
    .then(data => {
        console.log("Recept bol pridaný:", data);  // Úspešná odpoveď zo servera
        console.log(newRecipeData)
    })
    .catch(error => {
        console.error("Chyba pri pridávaní receptu:", error);  // Ošetrenie chyby
    });
});


let recipes = []

//-------------------------------------------Prijimanie dat z databazy na server a na hlavnu stranku ---------------------------------------
// Funkcia na načítanie receptov z databázy
async function getReceptsFromDB() {
    try {
        listOfRecepies.innerHTML = `<p>Načítavam recepty...</p>`;
        const response = await fetch('http://localhost:3000/api/recepty');
        if (!response.ok) {
            throw new Error('Chyba pri načítaní receptov');
        }
         recipes = await response.json(); // Načítanie JSON dát
        zobrazRecepty(recipes); // Zobrazenie receptov na stránke
        console.log(recipes)
        return recipes
    } catch (error) {
        console.error('Chyba:', error);
    }
}
//Nacitaj vsetky recepty z databazy a pridaj ich na stranku pri nacitani stranky
document.addEventListener('DOMContentLoaded', getReceptsFromDB);










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