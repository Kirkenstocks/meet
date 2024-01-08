import { useState } from 'react';

const NumberOfEvents = () => {
  const [numEventsShown, setNumEventsShown] = useState(32);

  return (
    <div id="number-of-events">
      <label htmlFor="event-number-input">Number of Events Displayed:</label>
      <input 
        type="text"
        id="event-number-input"
        value={numEventsShown}
        onChange={event => setNumEventsShown(event.target.value)}
      />
    </div>
  );
}

export default NumberOfEvents;