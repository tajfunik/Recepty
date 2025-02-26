

//-------------------------------------------Prijimanie dat z databazy na server a na hlavnu stranku ---------------------------------------
// Funkcia na načítanie Users z databázy
async function getAllUsersFromDB() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
            throw new Error('Chyba pri načítaní userov');
        }
        // Načítanie JSON dát
        const users = await response.json(); 
        return users
    } catch (error) {
        console.error('Chyba:', error);
    }
}

//Funkcia na prihlasenie
//Zoberie vsetkych pouzivatelov ulozenych v databaze a porovna ich s aktualnymi credentials
//Ak je zhoda, prehodi nas to na hlavnu stranku
//Ulozi meno pouzivatela do Localstorage pre nasledujuce pouzitie po nacitani stranky (zobrazi meno pouzivatela na hlavnej stranke)
document.getElementById("login-form").addEventListener('submit', async function(e){
    e.preventDefault()
    
    const nameFromLogin = document.getElementById('login-name').value
    const hesloFromLogin = document.getElementById('login-password').value
    
    if(!nameFromLogin || !hesloFromLogin){
        alert(`Zadajte prosim vsetky udaje`)
        return
    }
    
    try {
        const users = await getAllUsersFromDB(); // Počkáme na odpoveď z databázy
        if (!users || users.length === 0) {
            alert("V databáze sa nenachádzajú žiadni užívatelia.");
            return;
        }

        users.forEach((user) => {
            if (user.meno === nameFromLogin && user.heslo === hesloFromLogin) {
                //musim si meno odlozit do localstorage na nasledovne pridanie na stranku po jej nacitani
                localStorage.setItem("loggedInUser", user.meno);
                // Presmerovanie na hlavnú stránku
                window.location.href = "/";
            }
        });

        nameFromLogin.value = ""
        hesloFromLogin.value = ""

    } catch (error) {
        console.error("Chyba pri načítaní užívateľov:", error);
    }
})
