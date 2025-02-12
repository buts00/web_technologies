describe('Expenses Tracker Integration Test', () => {
  beforeEach(() => {

    cy.visit('http://localhost:5001/login');
  });

  it('should log in and navigate to transactions page', () => {
    // Введення даних для входу
    cy.get('input[name="username"]').type('123456');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();


    cy.url().should('eq', 'http://localhost:5001/');

    cy.contains('Add Expense').should('be.visible');


    cy.get('table').should('be.visible');
  });

  it('should display weekly spend chart', () => {

    cy.get('input[name="username"]').type('123456');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();


    cy.get('.weekly-spend-chart').should('be.visible');
    cy.get('.chart-container canvas').should('exist');

    cy.get('.total-spend h3').should('not.be.empty');
  });
});
