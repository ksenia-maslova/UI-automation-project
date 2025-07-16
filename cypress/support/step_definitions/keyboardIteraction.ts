import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

When("the user presses {string} key on keyboard", (key: string) => {
    if(key == "enter" || key == "esc") {
        cy.get('body').type(`{${key}}`);
    } else {
        throw new Error(`Key ${key} isn't supported by this step.`);
    }
});