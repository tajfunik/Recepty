describe('Login stránka', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('sa načíta správne a obsahuje potrebné prvky', () => {
    cy.url().should('include', '/login');

    cy.get('[data-cy=login-name]').should('exist');
    cy.get('[data-cy=login-password]').should('exist');
    cy.get('[data-cy=login-submit]').should('exist');
  });

  it('umožňuje vyplniť formulár a odoslať ho', () => {
    cy.get('[data-cy=login-name]').type('testuser');
    cy.get('[data-cy=login-password]').type('testpassword');
    cy.get('[data-cy=login-submit]').click();

    // Tu môžeš pridať test na úspešný login (napr. presmerovanie alebo zobrazenie správy)
  });
});
