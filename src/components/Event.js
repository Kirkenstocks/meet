import { useState } from 'react';

const Event = ( {event} ) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p data-testid="event-start">{new Date(event.created).toUTCString()}</p>
      <p>{event.location}</p>
      {showDetails ? 
        <div className="details">
          <h4>About event:</h4>
          <p>{event.description}</p>
        </div> : null}
      <button className="details-btn" onClick={() => {
        showDetails ? setShowDetails(false) : setShowDetails(true)
        }}>{showDetails ? "Hide details" : "Show details"}</button>
    </li>
  );
}

export default Event;