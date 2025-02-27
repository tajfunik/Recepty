
//Vytiahneme si udaje z Login formulara
//Posleme ich na server ako Objekt
//Ulozime si do LocalStorage meno uzivatela
//Vymazeme hodnoty vo formulare
document.getElementById("login-form").addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nameFromLogin = document.getElementById('login-name').value;
    const hesloFromLogin = document.getElementById('login-password').value;
    
    if (!nameFromLogin || !hesloFromLogin) {
        alert(`Zadajte prosím všetky údaje`);
        return;
    }
    
    try {
        //Posielame poziadavku na server na danu URL adresu
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ meno: nameFromLogin, heslo: hesloFromLogin })
        });
        //Ziskavanie odpovede zo servera vo formate JSON
        const data = await response.json();

        if (!response.ok) {
            alert(data.message || 'Chyba pri prihlásení');
            return;
        }

        localStorage.setItem("loggedInUser", data.user.meno);
        localStorage.setItem("token", data.token);
        console.log("JWT Token:", data.token);
        window.location.href = "/"; // Presmerovanie na hlavnú stránku

        document.getElementById('login-name').value = "";
        document.getElementById('login-password').value = "";

    } catch (error) {
        console.error("Chyba pri prihlásení:", error);
    }
});


