document.getElementById('registration-form').addEventListener('submit', function(e){
    e.preventDefault()

    let menoInput = document.getElementById('register-name');
    let hesloInput = document.getElementById('register-password');

    // Získanie ich hodnôt
    // Odstránenie prázdnych miest
    let menoForm = menoInput.value.trim();  
    let hesloForm = hesloInput.value.trim();

    if (!menoForm || !hesloForm) {
        alert("Prosím, vyplňte všetky polia.");
        return; // Ukončí funkciu, ak sú polia prázdne
    }

    const newUser = {
        meno: menoForm,
        heslo: hesloForm
    }

    // 5. Posielame dáta o Userovi na server zo stranky cez fetch API
    fetch("/api/users", {  // URL, na ktorú posielame požiadavku
        method: "POST",  // Používame metódu POST, pretože chceme vytvoriť nový záznam
        headers: {
            "Content-Type": "application/json",  // Posielame dáta v JSON formáte
        },
        body: JSON.stringify(newUser),  // Prevod objektu na JSON
    })
    .then(response => response.json())  // Čakáme na odpoveď zo servera a parsujeme ju ako JSON
    .then(data => {
        console.log("User bol pridaný:", data);

        menoInput.value = "";
        hesloInput.value = "";

         // ✅ Alternatívny spôsob vymazania (ak predošlé nefunguje)
         document.getElementById('registration-form').reset();

    })
    .catch(error => {
        console.error("Chyba pri pridávaní noveho usera:", error);  // Ošetrenie chyby
    });

});

