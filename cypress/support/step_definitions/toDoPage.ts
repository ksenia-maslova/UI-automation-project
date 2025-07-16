import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import ToDoPage from "../../pages/ToDoPage";

const toDoPage = new ToDoPage();

Given("the user has added {string} item to To Do list", (text: string) => {
  toDoPage.getToDoInput().type(text);
  toDoPage.getToDoInput().type("{enter}");
});

When("the user types {string} into input field", (text: string) => {
  toDoPage.getToDoInput().type(text);
});

When("the user removes {string} from the list", (text: string) => {
  toDoPage.getAllToDos().contains(text).realHover();
  toDoPage.getRemoveButtonForSpecificItem(text).click();
});

When("the user marks {string} item as completed", (itemText: string) => {
  toDoPage.markTaskCompleted(itemText);
});

When("the user marks all items completed", () => {
  toDoPage.getCompleteAllToggle().click();
});

Then("there are no items in to do list", () => {
  toDoPage.getAllToDos().should("have.length", 0);
});

Then("to do input has {string} placeholder attribute", (attr: string) => {
  toDoPage.getToDoInput().invoke("attr", "placeholder").should("eq", attr);
});

Then("To Do page has {string} header", (expectedText: string) => {
  toDoPage.getPageHeader().should("have.text", expectedText);
});

Then("To Do page header is {string}", (state: string) => {
  toDoPage.getPageHeader().should(`be.${state}`);
});

Then(/^there (?:is|are) (\d+) to do item(?:s)?$/, (count: string) => {
  toDoPage.getAllToDos().should("have.length", Number(count));
});

Then("item {string} is added into to do list", (itemText: string) => {
  toDoPage.getAllToDos().contains(itemText).should("be.visible");
});

Then("to do count has {string} text", (counterText: string) => {
  toDoPage.getToDoCount().should("have.text", counterText);
});

Then("{string} item marked as completed", (itemText: string) => {
  toDoPage.getAllCompletedTasks().contains(itemText).should("be.visible");
});