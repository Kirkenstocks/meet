/* eslint-disable */
import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
  let NumOfEventsComponent;
  beforeEach(() => {
    NumOfEventsComponent = render(<NumberOfEvents />);
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