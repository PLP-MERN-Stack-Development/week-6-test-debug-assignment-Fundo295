describe('Bug Tracker App', () => {
  it('should display heading and form', () => {
    cy.visit('/');
    cy.contains('Bug Tracker');
    cy.get('form').should('exist');
  });
});
