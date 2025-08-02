//const { response } = require("express")

const listOfRecepies = document.querySelector('.list-of-recepts')
const selectedReceptTitle = document.querySelector('.detail-title')
const selectedReceptImg =  document.querySelector('.detail-img')
const selectedReceptIngredients = document.querySelector('.detail-ingredients')
const selectedReceptSteps =  document.querySelector('.detail-steps')



//-------------------------------------------Nastavenia mena pouzivatela + Logout button ---------------------------------------
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


//-------------------------------------------Prijimanie dat z databazy na server a na hlavnu stranku ---------------------------------------
// Funkcia na načítanie receptov z databázy
let recipes = []

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



//-----------------------------------------------------Praca s udajmi z databazy na nasej stranke-----------------------------------------------
//Funkcia ktora nam zobrazuje recepty z casti "Nase recepty"
//Zavolame ju po kliknuti konkretnej kategorie v dalsej casti kodu
function zobrazRecepty(array){
    listOfRecepies.innerHTML = ""
    if(!array || array.length === 0) {
        console.log(`Neboli najdene ziadne jedla v tejto kategorii`)
        return
    }
    array.forEach((recept) => {
        const receptDiv = document.createElement('div');
        receptDiv.classList.add('recept');

        // Výpočet priemerného hodnotenia
        const ratings = recept.ratings || [];
        const avgRating = ratings.length > 0 ? (ratings.reduce((sum, num) => sum + num, 0) / ratings.length).toFixed(1) : "0.0";
        //let stars = "☆☆☆☆☆"

        receptDiv.innerHTML = `
            <div class="recept-left">
                <img src="${recept.obrazok}" alt="Obrazok nenajdeny">
            </div>
            <div class="recept-right">
                <h3>${recept.title}</h3>
                <p>${recept.jednotlive_kroky}</p>

                <!-- Zobrazenie hodnotenia -->
                <div class="rating">
                    <span class="average-rating">Rating = ${avgRating}/5</span>
                    <span class="average-rating">Vase hodnotenie: </span>
                    <span class="rating-input" data-recept-id="${recept._id}">
                     ★★★★★</span>
                </div>
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



//---------------------------------------------------Pridanie noveho receptu do databazy z formulara na stranke--------------------------------
//Vytvorime si API POST request cez FETCH metodu
//Pomocou metody FETCH odosleme POST request server a nasledne ulozime do databazy (dalse spracovanie requestu je definovane v controlleri)
async function pridajReceptZoStranky(mojRecept){

    try {
        const response = await fetch ('/api/recepty', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",  
            },
            body: JSON.stringify(mojRecept),
        })
    
        if(!response.ok){
            throw new Error(`Chyba: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json()
        console.log("Recept bol pridaný:", data);
    } catch (error) {
        console.log(`Nieco sa nepodarilo ako malo`, error)
    }

}

//Vytiahneme si hodnoty z formulara a vytvorime objekt
document.querySelector(".pridajNovyReceptNaStranke").addEventListener("click", function(e){
    e.preventDefault()

    //const form = document.querySelector("#myForm")
    const form = document.querySelector("#myForm");
    const nazovFromPageFormular = document.querySelector("#title").value
    const categoryFromPageFormular = document.querySelector("#category").value 
    const stepsFromPageFormular = document.querySelector("#steps").value 
    const imageFromPageFormular = document.querySelector("#imageUpload").value
    
    // Získame hodnoty z checkboxov - ingrediencie
    const ingredientsFromPageFormular = [];
    form.querySelectorAll('input[name="ingredients"]:checked').forEach(checkbox => {
        ingredientsFromPageFormular.push(checkbox.value);
    });

    const newRecept = {
        category: categoryFromPageFormular,
        title: nazovFromPageFormular,
        ingredients: JSON.stringify(ingredientsFromPageFormular),
        jednotlive_kroky: stepsFromPageFormular,
        obrazok: `/img/` + imageFromPageFormular
    }

    pridajReceptZoStranky(newRecept)

    document.querySelector("#title").value = ""
    document.querySelector("#category").value = ""
    document.querySelector("#steps").value = ""
    document.querySelector("#imageUpload").value = ""

})






