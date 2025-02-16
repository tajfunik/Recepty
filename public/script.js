document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/recepty'); // Pošle GET požiadavku na backend
        const data = await response.json();
        document.getElementById("message").textContent = data.message; // Vloží správu do stránky
    } catch (error) {
        console.error("Chyba pri načítaní dát:", error);
    }
});



//-------------------------------------------------Posielanie dat na server---------------------------------
document.getElementById('sendButton').addEventListener('click', async () => {
    const newRecipe = {
        title: "Torta",
        author: "J.K. Rowling",
        type: "chocolate",
        timeToPrepare: 1.2 
    };

    try {
        const response = await fetch('/recepty', {
            method: 'POST',  // Určujeme POST metódu
            headers: {
                'Content-Type': 'application/json'  // Určujeme, že posielame JSON dáta
            },
            body: JSON.stringify(newRecipe)  // Konvertujeme objekt na JSON a posielame ho
        });

        const data = await response.json();  // Spracujeme odpoveď zo servera
        console.log("Odpoveď zo servera:", data);  // Vypíšeme odpoveď do konzoly

    } catch (error) {
        console.error("Chyba pri posielaní dát:", error);  // Ak nastane chyba
    }
})
