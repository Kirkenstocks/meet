/* eslint-disable */
import { render } from '@testing-library/react';
import Event from "../components/Event";
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;
  beforeEach(async() => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  })
  
  test('renders event name', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    expect(EventComponent.queryByTestId('event-start')).toBeInTheDocument();
  });  

  test('renders event location', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders a button to show event details, with the name (show details)', () => {
    expect(EventComponent.queryByText('Show details')).toBeInTheDocument();
  });

  test('an event details section is collapsed by default', () => {
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
  });

  test('show event details when the user clicks on the (show details) button', async () => {
    const user = userEvent.setup();
    await user.click(EventComponent.queryByText('Show details'));

    expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
  });

  test('button text changes to (hide details) when details are shown', async () => {
    const user = userEvent.setup();
    await user.click(EventComponent.queryByText('Show details'));

    expect(EventComponent.queryByText('Show details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('Hide details')).toBeInTheDocument();
  });

  test('hide event details when the user clicks on the (hide details) button', async () => {
    const user = userEvent.setup();
    await user.click(EventComponent.queryByText('Show details'));
    expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
    
    await user.click(EventComponent.queryByText('Hide details'));
    expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
  });
});