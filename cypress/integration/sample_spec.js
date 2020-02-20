describe('My first test', function() {
    it('Visits the home page', function() {
        cy.visit('localhost:8020/')

        cy.get('.btn-login').click()

        cy.url().should('include', '/loginform')

        cy.get('input[name="username"]')
            .type('CarlsonTeagan')
            .should('have.value', 'CarlsonTeagan')
        cy.get('input[name="password"]')
            .type('UVM79OFG6GN')
            .should('have.value', 'UVM79OFG6GN')

        cy.get('input[value="login"]').click()

        cy.url().should('include', '/mylibrary/all')

        cy.get('a[name="details1"]').click()

        cy.url().should('include', '/elaborations/all/1')

        cy.get('a[name="mylibrary"]').click()

        cy.url('include', '/mylibrary/all')

        cy.get('a[name="delete1"]').click()

        cy.url().should('include', '/mylibrary/all')

        cy.get('a[name="add"]').click()

        cy.url().should('include', '/elaborations/all')

        cy.get('a[name="add1"]').click()

        cy.url().should('include', '/mylibrary/all')

        cy.get('a[name="add"]').click()

        cy.get('input[name="title"')
            .type('We')
            .should('have.value', 'We')

        cy.get('input[value="Szukaj"]').click()

        cy.url().should('include', '/elaborations/searchElaborations')

    })
})