
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { 
    cy.get('#firstName').type('First')
    cy.get('#lastName').type('Last')
    cy.get('#email').type('first@email.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
 })