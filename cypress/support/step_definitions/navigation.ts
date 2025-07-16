import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the start application page", () => {
  cy.visit("/");
});