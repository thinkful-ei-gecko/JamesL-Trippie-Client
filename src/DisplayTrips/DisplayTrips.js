import React, { Component } from 'react';
import './DisplayTrips.css';
import { Link } from 'react-router-dom';
import config from '../config';
import ApiContext from '../ApiContext';

class DisplayTrips extends Component {

  static contextType = ApiContext

  handleDeleteTrips = e => {
    const tripId = e

    fetch(`${config.API_ENDPOINT}/trips/${tripId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if(!res.ok)
          return res.json()
          .then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.deleteTrip(tripId)
      })
      .catch(error => {
        console.error({error})
      })
  }

  render() {

    return (
      <div className="trips-list">
        <h3>Upcoming Trips:</h3>
        <ul>
          {this.props.trips.map(trip => 
            <li key={trip.id}>
              
              {trip.trip_title}

              <Link to={`/trips/${trip.id}/displayPlans`}>
                <button type="submit" className="display-plans-btn">Display Plans</button>
              </Link>

              <Link to={`/trips/${trip.id}/addPlans`}>
                <button type="submit" className="create-plans-btn">Add Plans</button>
              </Link>

              <button 
                className="delete-btn" 
                type="button" 
                onClick={() => this.handleDeleteTrips(trip.id)}
                >&#x2715;</button>
            </li>
          )}
        </ul>
      </div>
    )
  }
};

export default DisplayTrips;