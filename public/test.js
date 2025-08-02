const products = [
    { name: "Notebook", category: "elektronika", price: 1000, available: true },
    { name: "Slúchadlá", category: "elektronika", price: 150, available: false },
    { name: "Tričko", category: "oblečenie", price: 20, available: true },
    { name: "Televízor", category: "elektronika", price: 500, available: true },
    { name: "Bunda", category: "oblečenie", price: 80, available: false },
  ];

const filtrovanie = (products) =>{
    products.filter(produkt => {
        produkt.name === 'notebook'
    })
}

console.log(filtrovanie)