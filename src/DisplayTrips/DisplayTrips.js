import React from 'react';
import './DisplayTrips.css';

function DisplayTrips(props) {
  return (
    <div className="trips-list">
      <h3>Upcoming Trips:</h3>
      <ul>
        {props.trips.map(trip => 
          <li key={trip.id}>
            
            {trip.trip_title}
            <button type="submit" className="display-plans-btn">Display Plans</button>
            <button type="submit" className="create-plans-btn">Add Plans</button>
          </li>
        )}
      </ul>
    </div>
  )
};

export default DisplayTrips;