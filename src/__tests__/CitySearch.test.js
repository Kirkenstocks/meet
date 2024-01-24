/* eslint-disable */
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

// unit tests
describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch 
      allLocations={[]}
      setCurrentCity={() => {}} 
      setInfoAlert={() => {}}
    />);
  })

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setInfoAlert={() => {}} />);

    //user types Berlin into search bar
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    //city typed by user is filtered for
    const suggestions = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];

    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      for (let i = 0; i < suggestions.length; i +=1) {
        expect(suggestionListItems[i].textContent).toBe(suggestions[i])
      }
  });

  test('only "see all cities" is shown if user enters a city with no events', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setInfoAlert={() => {}} />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Paris, France');

    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(1);
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch
      allLocations={allLocations}
      setCurrentCity={() => {}}
      setInfoAlert={() => {}} 
    />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, 'Berlin');

    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

// integration tests
describe('<CitySearch /> integration', () => {
  test('renders suggestion list when the app is rendered', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});