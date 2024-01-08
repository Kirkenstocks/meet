import { useState } from 'react';

const Event = ( {event} ) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <h2>{event.summary}</h2>
      <p>{new Date(event.created).toISOString()}</p>
      <p>{event.location}</p>
      {showDetails ? 
        <div className="details">
          <h4>About event:</h4>
          <p>{event.description}</p>
        </div> : null}
      <button onClick={() => {
        showDetails ? setShowDetails(false) : setShowDetails(true)
        }}>{showDetails ? "Hide details" : "Show details"}</button>
    </li>
  );
}

export default Event;