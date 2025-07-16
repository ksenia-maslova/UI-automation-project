import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import ToDoPage from "../../pages/ToDoPage";

const toDoPage = new ToDoPage();

Then("ToDo page has {string} header", (expectedText: string) => {
  toDoPage.getPageHeader().should("have.text", expectedText);
});

Then("ToDo page header is {string}", (state: string) => {
  toDoPage.getPageHeader().should(`be.${state}`);
});