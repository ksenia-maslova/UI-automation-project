Feature: Sidebar info
    As a user
    I want to see the sidebar
    So that I can access importand details and information

Background: Navigate to the application
    Given I am on the start application page

@smoke
Scenario: Verify that sidebar is displayed
    Then side menu is "visible" on the page
        And side menu has "JavaScript ES6" title
        And side menu has source link
        And source link has the following href attribute: "https://github.com/tastejs/todomvc/tree/gh-pages/examples/javascript-es6"
        And quote speech text is "visible"
        And quote speech has the following text: "The ECMAScript 6 (ES2015) standard was ratified in 2015 following years of work standardizing improvements to ECMAScript 3. The committee introduced a wide variety of improvements such as arrow functions, const declarations, and native Promises."