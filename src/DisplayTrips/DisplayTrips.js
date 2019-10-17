import React from 'react';
import './DisplayTrips.css';
import { Link } from 'react-router-dom';

function DisplayTrips(props) {
  return (
    <div className="trips-list">
      <h3>Upcoming Trips:</h3>
      <ul>
        {props.trips.map(trip => 
          <li key={trip.id}>
            
            {trip.trip_title}
            <Link to={`/trips/${trip.id}/displayPlans`}>
              <button type="submit" className="display-plans-btn">Display Plans</button>
            </Link>

            <Link to={`/trips/${trip.id}/addPlans`}>
              <button type="submit" className="create-plans-btn">Add Plans</button>
            </Link>
            <button className="delete-btn">&#x2715;</button>
          </li>
        )}
      </ul>
    </div>
  )
};

export default DisplayTrips;