# Meet App

### Description
The Meet app is a serverless, progressive web application built with React using a test-driven development technique. The application uses the Google
Calendar API to fetch upcoming events.

### How to Use
To visit the live site, follow this link to [https://kirkenstocks.github.io/meet/] (https://kirkenstocks.github.io/meet/).
To run the app locally download the repository, navigate to the root folder in your terminal, and use the command <code>npm run start</code>. Be aware that while running on a local server the app will use an abbreviated event list from mockdata.js.

### Features with User Stories and Scenarios in Gherkin's Syntax
- **Filter Events by City**\
  User story: As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.
  1. Scenario: when the user hasn’t searched for a specific city, show upcoming events from all cities\
     Given user hasn’t searched for any city;\
     When the user opens the app;\
     Then the user should see a list of upcoming events.
  2. Scenario: user should see a list of suggestions when they search for a city\
     Given the main page is open;\
     When the user starts typing in the city textbox;\
     Then the user should receive a list of cities (suggestions) that match what they’ve typed.
  3. Scenario: user can select a city from the suggested list\
     Given user was typing “London” in the city textbox AND the list of suggested cities is showing;\
     When the user selects a city from the list;\
     Then their city should be changed to that city AND the user should receive a list of upcoming events in that city.
     
- **Show/Hide Event Details**\
  User story: As a user, I should be able to toggle the visibility of event details so that I can display or hide information about an event.
  1. Scenario: an event element is collapsed by default\
     Given the user is on the events page;\
     When the user has not selected an event;\
     Then the event element is collapsed AND details are hidden.
  2. Scenario: user can expand an event to see details\
	   Given the user is on the events page;\
	   When the user clicks on an event;\
	   Then the event element is expanded AND the details are shown.
  3. Scenario: user can collapse an event to hide details\
	   Given that the user has opened an event element;\
	   When the user clicks to collapse the event;\
	   Then the event element will close AND hide the details.

- **Specify Number of Events**\
  User story: As a user, I should be able to determine how many events are shown at a time so that I can tailor my view to my preferences and see as many events as I want.
  1. Scenario: when user hasn’t specified a number, 32 events are shown by default\
	   Given that the user has opened the app;\
	   When the user has not specified a number of events to be shown;\
	   Then 32 events will be shown by default.
  2. Scenario: user can change the number of events displayed\
	   Given the user is on the events page;\
	   When the user chooses the number of events to be displayed;\
	   Then the page should reload to show the specified number of events.

- **Use the App When Offline**\
  User Story: As a user, I should be able to use the app without a consistent internet connection so that I can look up event information without always needing the internet.
  1. Scenario: show cached data when there’s no internet connection\
     Given the user has previously used the app with an internet connection and cached data is available;\
	   When the user accesses the app without an internet connection;\
	   Then the app should display the cached data AND allow the user to interact with it.
  2. Scenario: show error when user changes search settings (city, number of events)\
     Given the user has previously used the app with an internet connection and cached data is available;\
     When the user changes search settings without an active connection;\
     Then the app should display an error message indicating the need for an internet connection to update the search settings.

- **Add an App Shortcut to the Home Screen**\
  User Story: As a frequent user, I should be able to add a shortcut to the app to my device’s home screen so that I can quickly and easily access the app.
  1. Scenario: user can install the Meet app as a shortcut on their device's home screen\
	   Given the user has accessed the app from their device;\
	   When the user chooses the “add to home screen” option in their settings;\
     Then the app widget should be added to their home screen AND they can open the app by clicking/pressing it.

- **Display Charts Visualizing Event Details**\
  User Story: As a user, I should be able to find out the number and types of events in my city so that I have more data about what types of events are accessible to me.
  1. Scenario: show a chart with the number of upcoming events in each city\
     Given the user has opened the app and has an active connection or the relevant data is cached;\
	   When the user clicks on the “show event data” button;\
	   Then the user will be shown charts with the number of events in each city.

### Serverless Architecture
Serverless functions are used throughout the app to achieve its core functions and define its business logic. They are used to handle user authorization by coordinating the Meet front end with the Google OAuth server, enabling the user to sign in with their Google account. Once authorized, serverless functions allow the user to search for events, filter by city, and return public Google Calendar data via the Meet front end. 

### Technologies Used
- React
- AWS Lambda
- Google OAuth2
- Google Calendar API
- Recharts
- NProgress
- Jest/Jest-Cucumber
- Puppeteer
- Atatus\
Note: a full list of dependencies can be found in the package.json file.

### Credits
This project was built for the CareerFoundry Full-Stack Web Development program, with their instruction essential to its completion.
