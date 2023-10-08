Cypress._.times(5, ()=>{
    it.only("Testa página de política de privacidade separadamente", ()=>{
        cy.visit('./src/privacy.html')
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
        cy.contains('Talking About Testing').should('be.visible')
    })
})