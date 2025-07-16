Feature: Verify ToDo list functionality

  Background: Application is opened
    Given I am on the start application page

  Scenario: User can add To Do items to the list
    Then to do input has "What needs to be done?" placeholder attribute
    When the user types "To Do item #1" into input field
    Then there are no items in to do list
    When the user presses "enter" key on keyboard
    Then there is 1 to do item
      And item "To Do item #1" is added into to do list
      And to do count has "1 item left" text
    When the user types "To Do item #2" into input field
      And there is 1 to do item
    When the user presses "enter" key on keyboard
    Then there are 2 to do items
      And item "To Do item #2" is added into to do list
      And to do count has "2 items left" text

  Scenario: User can remove To Do item
    Given the user has added "To Do #1" item to To Do list
      And the user has added "To Do #2" item to To Do list
      And the user has added "To Do #3" item to To Do list
    Then there are 3 to do items
    When the user removes "To Do #1" from the list
    Then there are 2 to do items
    When the user removes "To Do #2" from the list
      And the user removes "To Do #3" from the list
    Then there are no items in to do list

  Scenario: User can mark a To Do item as completed
    Given the user has added "To Do #1" item to To Do list
      And the user has added "To Do #2" item to To Do list
    When the user marks "To Do #1" item as completed
    Then to do count has "1 item left" text
      And "To Do #1" item marked as completed

  Scenario: User can mark all items as completed
    Given the user has added "To Do #1" item to To Do list
      And the user has added "To Do #2" item to To Do list
      And the user has added "To Do #3" item to To Do list
    When the user marks all items completed
    Then there are 3 to do items
      And "To Do #1" item marked as completed
      And "To Do #2" item marked as completed
      And "To Do #3" item marked as completed
      And to do count has "0 items left" text
