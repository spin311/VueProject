describe('Home Page Test', () => {
  it('visits home and interacts with cat items', () => {
    cy.visit('/');

    cy.get('.cat-item') // Get all divs with class 'cat-item'
      .its('length')
      .should('be.gt', 1) // there should be more than 1 cat-item

    cy.get('.cat-item')
      .first()
      .find('#heartIcon')
      .click();

    cy.visit('/favorites');
    cy.get('.cat-item')
      .its('length')
      .should('be.eq', 1)
  });
});

describe('Breeds Page Test', () => {
  it('interacts with breeds image and checks description', () => {
    cy.visit('/breeds');
    let initialImgUrl;

    cy.get('.cat-item img')
      .should('have.attr', 'src')
      .then((src) => {
        initialImgUrl = src;
      });

    cy.get('#changeImageLeft')
      .click();

    cy.get('.cat-item img')
      .should('have.attr', 'src')
      .should('not.eq', initialImgUrl); // Image should change

    cy.get('#imageDescription')
      .should('not.be.empty');
  });
});