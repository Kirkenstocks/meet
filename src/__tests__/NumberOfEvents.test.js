/* eslint-disable */
import { render, within, waitFor } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';
import App from '../App';

// unit tests
describe('<NumberOfEvents /> component', () => {
  let NumOfEventsComponent;
  beforeEach(() => {
    NumOfEventsComponent = render(<NumberOfEvents setCurrentNOE={()=> {}} setErrorAlert={() => {}} />);
  });

  test('renders a textbox input field', () => {
    expect(NumOfEventsComponent.queryByRole('textbox')).toBeInTheDocument();
  });

  test('renders a label for the textbox', () => {
    expect(NumOfEventsComponent.queryByText('Number of Events Displayed:')).toBeInTheDocument();
  });

  test('set default number of events shown to 32', () => {
    expect(NumOfEventsComponent.queryByRole('textbox')).toHaveValue('32');
  });

  test('value of the textbox changes with user input', async () => {
    const user = userEvent.setup();
    const numEventsTextbox = NumOfEventsComponent.queryByRole('textbox');
    await user.type(numEventsTextbox, '{backspace}{backspace}10');

    expect(numEventsTextbox).toHaveValue('10');
  });
});

// integration tests
describe('<NumberOfEvents /> integration', () => {
  test('number of events rendered changes to correctly match the number specified by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumEventsDOM = AppDOM.querySelector('#number-of-events');
    const numEventsTextbox = within(NumEventsDOM).queryByRole('textbox');
    await user.type(numEventsTextbox, '{backspace}{backspace}10');

    const EventListDOM = AppDOM.querySelector('#event-list');
  
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(10);
    });
  });
});