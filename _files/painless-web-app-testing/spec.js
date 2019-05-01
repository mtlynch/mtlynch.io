---
title: spec.js
---
it('detects angry sentiment', () => {
  cy.visit('/analyze')

  cy.get('#feelings')
    .type('I REALLY need some COFFEE')
  cy.get('form').submit()

  cy.get('.results p')
    .should('contain', 'You are feeling: Angry')
})

it('detects content sentiment', () => {
  cy.visit('/analyze')

  cy.get('#feelings')
    .type('I think coffee in the morning is just swell!')
  cy.get('form').submit()

  cy.get('.results p')
    .should('contain', 'You are feeling: Content')
})
