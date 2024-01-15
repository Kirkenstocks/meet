/* eslint-disable */
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('when user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
    let AppComponent;
    given('that the user has opened the app', () => {
      AppComponent = render(<App />);
    });
    
    let AppDOM;
    when('the user has not specified a number of events to be shown', () => {
      AppDOM = AppComponent.container.firstChild;
      const eventNumInput = AppDOM.querySelector('#event-number-input');
      expect(eventNumInput).toHaveValue('32');
    });

    then('32 events will be shown by default.', async () => {
      await waitFor(() => {
        const EventList = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventList).queryAllByRole('listitem');
        expect(EventListItems).toHaveLength(32);
      });
    });
});

  test('user can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    given('the user is on the main page', () => {
      AppComponent = render(<App />);
    });
    
    let AppDOM;
    when('the user chooses the number of events to be displayed', async () => {
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      const eventNumInput = AppDOM.querySelector('#event-number-input');
      await user.type(eventNumInput, '{backspace}{backspace}10');
      expect(eventNumInput).toHaveValue('10');
    });

    then('the page should reload to show the specified number of events.', async () => {
      await waitFor(() => {
        const EventList = AppDOM.querySelector('#event-list');
        const EventListItems = within(EventList).queryAllByRole('listitem');
        expect(EventListItems).toHaveLength(10);
      });
    });
  });
});