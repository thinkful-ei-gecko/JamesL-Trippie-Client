import React, { Component } from 'react';
import './DisplayTrips.css';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import { deleteTripFetch } from '../Service/Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class DisplayTrips extends Component {

  static contextType = ApiContext

  handleDeleteTrips = tripId => {
    deleteTripFetch(tripId)
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
        <h3 className="upcoming-trips-headtag">Upcoming Trips:</h3>
        <ul className="display-trips">
          {this.context.trips.map(trip => 
            <div className="trip-container" key={trip.id}>
              <Link className="trip-link" to={`/trips/${trip.id}/displayPlans`} style={{ textDecoration: 'none' }}>
                <li className="trip-title-list">
                    {trip.trip_title}
                </li>
              </Link>
              <FontAwesomeIcon icon={faTrashAlt}
                  className="delete-btn" 
                  type="button" 
                  onClick={() => this.handleDeleteTrips(trip.id)}
              ></FontAwesomeIcon>
            </div>
          )}
        </ul>
      </div>
    )
  }
};

export default DisplayTrips;