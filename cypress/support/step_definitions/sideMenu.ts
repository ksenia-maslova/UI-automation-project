import { Then } from "@badeball/cypress-cucumber-preprocessor";
import SideMenu from "../../pages/SideMenu";

const sideMenu = new SideMenu();

Then("side menu is {string} on the page", (state: string) => {
    sideMenu.getSideContainer().should(`be.${state}`);
});

Then("side menu has {string} title", (title: string) => {
    sideMenu.getSideHeader().should("have.text", title);
});

Then("side menu has source link", () => {
    sideMenu.getSourceLink().should("exist");
});

Then("source link has the following href attribute: {string}", (link: string) => {
    sideMenu.getSourceLink().invoke("attr", "href").should("eq", link);
});

Then("quote speech text is {string}", (state: string) => {
    sideMenu.getBlockQuoteText().should(`be.${state}`);
});

Then("quote speech has the following text: {string}", (text) => {
    sideMenu.getBlockQuoteText().should("have.text", text);
});