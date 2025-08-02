describe('Registrácia stránka', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/registracia');
  });

  it('sa načíta správne a obsahuje potrebné prvky', () => {
    cy.url().should('include', '/registracia');

    cy.get('[data-cy=register-name]').should('exist');
    cy.get('[data-cy=register-email]').should('exist');
    cy.get('[data-cy=register-password]').should('exist');
    cy.get('[data-cy=register-submit]').should('exist');
  });

  it('umožňuje vyplniť formulár a odoslať ho', () => {
    cy.get('[data-cy=register-name]').type('novyuser');
    cy.get('[data-cy=register-email]').type('novyuser@example.com');
    cy.get('[data-cy=register-password]').type('mojeheslo123');
    cy.get('[data-cy=register-submit]').click();

    // Tu môžeš pridať test na úspešnú registráciu (napr. overenie presmerovania alebo správy)
  });
});
