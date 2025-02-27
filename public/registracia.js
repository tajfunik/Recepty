
//---------------------------------------------------Posielanie dat na server cez POST metodu--------------------------------
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

    if (!menoForm || !hesloForm) {
        alert("Prosím, vyplňte všetky polia.");
        return; 
    }

    const newUser = {
        meno: menoForm,
        email: emailForm,
        heslo: hesloForm
    }

    //Posielame dáta o Userovi na server zo stranky cez fetch API
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
        emailInput.value = "";
        hesloInput.value = "";

    })
    .catch(error => {
        console.error("Chyba pri pridávaní noveho usera:", error);  
    });

});

