import { useState } from 'react';

const NumberOfEvents = ( {currentNOE, setCurrentNOE} ) => {
  const [numEventsShown, setNumEventsShown] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumEventsShown(value);
    setCurrentNOE(value);
  };

  return (
    <div id="number-of-events">
      <label htmlFor="event-number-input" className="noe-label">Number of Events Displayed:</label><br></br>
      <input 
        type="text"
        id="event-number-input"
        value={numEventsShown}
        onChange={handleInputChanged}
      />
    </div>
  );
}

export default NumberOfEvents;