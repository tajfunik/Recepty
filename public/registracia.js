
//---------------------------------------------------Posielanie dat na server cez POST metodu--------------------------------

//Vytvorime funkciu na posielanie noveho usera
//Posielame dáta o Userovi na server zo stranky cez fetch API
    async function pridajUsera(newUser){
        try {
            const response = await fetch("api/users", {
                method: "POST",  // Používame metódu POST, pretože chceme vytvoriť nový záznam
                headers: {
                    "Content-Type": "application/json",  // Posielame dáta v JSON formáte
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error(`Chyba: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json()
            console.log("User bol pridaný:", data);

            // Vyčistenie vstupných polí
            document.getElementById('register-name').value = "";
            document.getElementById('register-email').value = "";
            document.getElementById('register-password').value = "";

        } catch (error){
            console.error("Chyba pri pridávaní nového usera:", error);
            alert("Nastala chyba pri registrácii. Skúste znova.");
        }
    }

//Po kliknuti na submit formulara si vytiahneme informacie
//Vytvorime noveo usera
//Posleme ho na server cez metodu "pridajUsera"
document.getElementById('registration-form').addEventListener('submit', function(e){
    e.preventDefault()

    const menoInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email')
    const hesloInput = document.getElementById('register-password');

    // Získanie ich hodnôt
    // Odstránenie prázdnych miest
    const menoForm = menoInput.value.trim();  
    const emailForm = emailInput.value.trim()
    const hesloForm = hesloInput.value.trim();

    if (!menoForm || !emailForm || !hesloForm) {
        alert("Prosím, vyplňte všetky polia.");
        return; 
    }

    const newUser = {
        meno: menoForm,
        email: emailForm,
        heslo: hesloForm
    }

    pridajUsera(newUser);

});

