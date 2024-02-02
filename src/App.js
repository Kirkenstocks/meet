import { useState, useEffect } from 'react';
import NProgress from 'nprogress';
import { extractLocations, getEvents } from "./api";
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import Footer from './components/Footer';
import { ErrorAlert, InfoAlert, WarningAlert } from './components/Alert';
import './App.css';

NProgress.configure({ showSpinner: false, minimum: 0.1, easing: 'ease', speed: 500 });

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [infoAlert, setInfoAlert] = useState('');
  const [errorAlert, setErrorAlert] = useState('');
  const [warningAlert, setWarningAlert] = useState('');

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See all cities' ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert('');
    } else {
      setWarningAlert('Events were loaded from the cache while offline. To refresh events, establish an internet connection and reload the app.');
    }
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        
      </div>
      <h1>Meet App</h1>
      <h2>Find a coding event near you!</h2>
      <CitySearch 
        allLocations={allLocations} 
        setCurrentCity={setCurrentCity} 
        setInfoAlert={setInfoAlert}
      />
      <NumberOfEvents 
        currentNOE={currentNOE}
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert} 
      />
      <div className="charts-container">
        <CityEventsChart events={events} allLocations={allLocations} />
        <EventGenresChart events={events} />
      </div>
      <EventList events={events} />
      <Footer />
    </div>
  );
}

export default App;
