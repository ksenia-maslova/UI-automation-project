Feature: Basic test scenario

  Background: Application is opened
    Given I am on the start application page

  Scenario: First test
    Then ToDo page has "todos" header
      And ToDo page header is "visible"
