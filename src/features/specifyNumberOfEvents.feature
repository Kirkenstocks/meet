Feature: Specify number of events
  Scenario: when user hasn’t specified a number, 32 events are shown by default
    Given that the user has opened the app
    When the user has not specified a number of events to be shown
    Then 32 events will be shown by default.
  Scenario: user can change the number of events displayed
    Given the user is on the main page
    When the user chooses the number of events to be displayed
    Then the page should reload to show the specified number of events.