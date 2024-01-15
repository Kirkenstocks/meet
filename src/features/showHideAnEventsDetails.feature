Feature: Show/hide event details
  Scenario: an event element is collapsed by default
    Given the user is on the main page
    When the user has not selected an event
    Then the event element is collapsed so details are hidden.

  Scenario: user can expand an event to see details
    Given the event details section is collapsed
    When the user clicks on an event
    Then the event element is expanded, showing the details.

  Scenario: user can collapse an event to hide details
    Given that the user has opened an event element
    When the user clicks to collapse the event
    Then the event element will close, hiding the details.