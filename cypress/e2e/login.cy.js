// Hlavný blok popisujúci testy pre Login stránku
describe('Login stránka', () => {

  // beforeEach() sa spustí pred KAŽDÝM testom (it blokom)
  // V tomto prípade zakaždým otvoríme login stránku
  beforeEach(() => {
    cy.visit('/login');  // Otvorí stránku http://localhost:3000/login
  });

  // 1️⃣ Test: Načítanie stránky a kontrola všetkých prvkov
  it('načíta stránku a zobrazí všetky prvky formulára', () => {

    // Overíme, že sme na správnej URL adrese (obsahuje /login)
    cy.url().should('include', '/login');

    // Overíme, že stránka obsahuje nadpis "Prihlásenie"
    cy.contains('h2', 'Prihlásenie').should('be.visible');

    // Skontrolujeme, že input pre meno existuje a je prázdny
    cy.get('[data-cy=login-name]')
      .should('exist')           // input existuje v DOMe
      .and('have.value', '');    // input je prázdny

    // Skontrolujeme, že input pre heslo existuje a je prázdny
    cy.get('[data-cy=login-password]')
      .should('exist')
      .and('have.value', '');

    // Skontrolujeme, že tlačidlo na prihlásenie existuje a má správny text
    cy.get('[data-cy=login-submit]')
      .should('exist')
      .and('contain.text', 'Prihlásiť sa');

    // Overíme, že formulár (obalovací div) je viditeľný a na stránke je len jeden
    cy.get('.form-container')
      .should('be.visible')      // viditeľný pre používateľa
      .and('have.length', 1);    // je tam len jeden takýto prvok
  });
  /*
  // 2. Validacia alert okna
  it('zobrazi chybu - alert okno, ak niektore z poli nie je vyplnene', () => {
     // Zachytíme alert okno
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Zadajte prosím všetky údaje');
    });

    // Klikneme na tlačidlo bez vyplnenia polí
    cy.get('[data-cy="login-submit"]').click();
  });

  // 3. Vrati chybu pri nepsravnych prihlasovacich udajoch
  it('zobrazí chybu pri nesprávnych prihlasovacích údajoch', () => {
    cy.get('[data-cy="login-name"]').type('neexistujuci_uzivatel');
    cy.get('[data-cy="login-password"]').type('zlenahoda');

    // Zachytíme alert z klienta
    cy.on('window:alert', (text) => {
      // Tu môžeš prispôsobiť podľa toho, čo reálne alertuješ
      expect(text).to.contain('Chyba pri prihlásení');
    });

    cy.get('[data-cy="login-submit"]').click();
  });

  //4. uspesne prihlasenie a presmerovanie
  it('prihlási používateľa so správnymi údajmi a presmeruje ho', () => {
    cy.get('[data-cy="login-name"]').type('Samko');        // <-- pridany skutocny user
    cy.get('[data-cy="login-password"]').type('Samko1234'); // <-- pridaneskutocne heslo

    cy.get('[data-cy="login-submit"]').click();

    // Skontroluj, že používateľ bol presmerovaný na hlavnú stránku
    cy.url().should('eq', 'http://localhost:3000/');

    // Overenie uloženia údajov do localStorage
    cy.window().then((win) => {
      const meno = win.localStorage.getItem('loggedInUser');
      const token = win.localStorage.getItem('token');

      expect(meno).to.equal('Samko'); // konkretne meno, ktore sme pouzili vyssie 
      expect(token).to.exist;
    });
  });*/
});
