/* eslint-disable */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Event from '../components/Event';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  // scenario 1
  test('an event element is collapsed by default', ({ given, when, then }) => {
    let AppComponent;
    given('the user is on the main page', () => {
      AppComponent = render(<App />);
    });

    let AppDOM;
    let EventListDOM;
    let EventListItems;
    when('the user has not selected an event', async () => {
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems).toHaveLength(32);
      });
    });

    then('the event element is collapsed so details are hidden.', async () => {
      const eventDetails = EventListDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
});

  // scenario 2
  test('user can expand an event to see details', ({ given, when, then }) => {
    let EventComponent;
    given('the event details section is collapsed', async () => {
      const allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
    });

    when('the user clicks on an event', async () => {
      const user = userEvent.setup();
      const showDetailsBtn = EventComponent.queryByText('Show details');
      await user.click(showDetailsBtn);
    });

    then('the event element is expanded, showing the details.', () => {
      const EventDOM = EventComponent.container.firstChild;
      const eventDetails = EventDOM.querySelector('.details');
      expect(eventDetails).toBeInTheDocument();
    });
  });

  // scenario 3
  test('user can collapse an event to hide details', ({ given, when, then }) => {
    let EventComponent;
    let allEvents;
    let EventDOM;
    let eventDetails;
    let user;
    given('that the user has opened an event element', async () => {
      user = userEvent.setup();
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);

      const showDetailsBtn = EventComponent.queryByText('Show details');
      await user.click(showDetailsBtn);

      EventDOM = EventComponent.container.firstChild;
      eventDetails = EventDOM.querySelector('.details');
      expect(eventDetails).toBeInTheDocument();
    });

    when('the user clicks to collapse the event', async () => {
      const hideDetailsBtn = EventComponent.queryByText('Hide details');
      await user.click(hideDetailsBtn);
    });

    then('the event element will close, hiding the details.', () => {
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
});