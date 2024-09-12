/// <reference types="cypress" />

describe('Home page', () => {
  const user = {
    email: 'ines-chan@wp.pl',
    password: '21Stokrotka21',
    name: 'Agnieszka',
    invalidEmail: 'ines-chanwp.pl',
  };
  beforeEach(() => {
    cy.visit('/');
  });
  it('should be able to log in', () => {
    cy.get('#cookiebotDialogOkButton').click();
    cy.get(
      '[data-testid="account-info-logged-false"] > .ds-dropdown-button > .ds-link > .ds-icon'
    ).click();
    cy.get('[data-name="login[username]"] > .valid > label').type(user.email);
    cy.get('[data-name="login[password]"] > .valid > label').type(
      user.password
    );
    cy.get('.primary__PrimaryButtonComponent-sc-1pct4vx-0').click();
    cy.get('.ds-button__light > .ds-icon').click();
    cy.get(
      '[data-testid="account-info-logged-true"] > .ds-dropdown-button > .ds-link'
    ).should('contain', user.name);
  });
  it('should not be able to log in with invalid password', () => {
    cy.get('#cookiebotDialogOkButton').click();
    cy.get(
      '[data-testid="account-info-logged-false"] > .ds-dropdown-button > .ds-link > .ds-icon'
    ).click();
    cy.get('[data-name="login[username]"] > .valid > label').type(user.email);
    cy.get('[data-name="login[password]"] > .valid > label').type(
      user.password + 21
    );
    cy.get('.primary__PrimaryButtonComponent-sc-1pct4vx-0').click();
    cy.get('.sc-gYhhMS').should('contain', 'Niepoprawny login i/lub hasło.');
  });
  it('should not be able to log in with invalid email', () => {
    cy.get('#cookiebotDialogOkButton').click();
    cy.get(
      '[data-testid="account-info-logged-false"] > .ds-dropdown-button > .ds-link > .ds-icon'
    ).click();
    cy.get('[data-name="login[username]"] > .valid > label').type(
      user.invalidEmail
    );
    cy.get('[data-name="login[password]"] > .valid > label').type(
      user.password
    );
    cy.get('.primary__PrimaryButtonComponent-sc-1pct4vx-0').click();
    cy.get('.text-field__ErrorMessage-sc-1vll61a-5').should(
      'contain',
      'Wprowadź poprawne znaki'
    );
  });
  it('should be able to add item to basket and delete item', () => {
    cy.get('#cookiebotDialogOkButton').click();
    cy.get(
      '[data-testid="account-info-logged-false"] > .ds-dropdown-button > .ds-link > .ds-icon'
    ).click();
    cy.get('[data-name="login[username]"] > .valid > label').type(user.email);
    cy.get('[data-name="login[password]"] > .valid > label').type(
      user.password
    );
    cy.get('.primary__PrimaryButtonComponent-sc-1pct4vx-0').click();
    cy.get('.ds-button__light > .ds-icon').click();
    cy.get(
      '[data-testid="account-info-logged-true"] > .ds-dropdown-button > .ds-link'
    ).should('contain', user.name);
    cy.get('#algoliaButton').click();
    cy.get('.ds-input-filed-wrapper > [data-testid="search-input"]').type(
      'komplet pościeli'
    );
  });
});
