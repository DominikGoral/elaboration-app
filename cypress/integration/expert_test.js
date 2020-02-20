describe('Expert tests', function() {
    it('Visits the home page', function() {
        cy.visit('localhost:8020/')

        cy.get('.btn-login').click()

        cy.url().should('include', '/loginform')

        cy.get('input[name="username"]')
            .type('KentWylie')
            .should('have.value', 'KentWylie')
        cy.get('input[name="password"]')
            .type('BKC10GXQ1TP')
            .should('have.value', 'BKC10GXQ1TP')

        cy.get('input[value="login"]').click()

        cy.url().should('include', '/elaborations/update')

        cy.get('a[name="modify1"]').click()

        cy.url().should('include', '/elaborations/update/1')

        cy.get('textarea[name="characteristic"]')
            .type('hdbsajdbasdjhasbdjhabsdjbh')

        cy.get('input[type="submit"]').click()

        cy.url().should('include', '/elaborations/update')

        cy.get('a[name="create"]').click()

        cy.get('a[name="create6"]').click()

        cy.get('textarea[name="characteristic"]')
            .type('hdbsajdbasdjhasbdjhabsdjbh')

        cy.get('input[type="submit"]').click()

    })
})