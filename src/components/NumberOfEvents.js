import { useState } from 'react';

const NumberOfEvents = ( { setCurrentNOE, setErrorAlert } ) => {
  const [numEventsShown, setNumEventsShown] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumEventsShown(value);

    let errorText;
    if (isNaN(value) || value <= 0) {
      errorText = "Enter a positive number";
    } else {
      errorText = "";
      setCurrentNOE(value);
    }
    setErrorAlert(errorText);

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