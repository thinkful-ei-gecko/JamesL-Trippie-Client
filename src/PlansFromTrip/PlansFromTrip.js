import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import Moment from 'react-moment';
import './PlansFromTrip.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { deletePlanFetch, getPlansForTrip } from '../Service/Service';

class PlansFromTrip extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeletePlans = planId => {
    deletePlanFetch(planId)
      .then(res => {
        if(!res.ok)
          return res.json()
          .then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.deletePlan(planId)
      })
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    const { tripId } = this.props.match.params
    const { plans = [], trips } = this.context
    const trip = trips.find(trip => trip.id === Number(tripId)) || {}
    const plansForTrip = getPlansForTrip(plans, tripId)
    const sortedTrip = plansForTrip.sort(function(a, b) {
      return new Date(a.from_date).getTime() - new Date(b.from_date).getTime()
    })

    return(
      <section className="plans-container">
        <Link to="/home">
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="back-chev-plans"></FontAwesomeIcon>
        </Link>
        <h3 className="plans-head">Plans for {trip.trip_title}</h3>
        <Link to={`/trips/${tripId}/addPlans`}>
          <button 
            type="submit" 
            className="create-plans-btn">&#x2b;</button>
        </Link>
        <ul className="display-plans">
          {sortedTrip.map(plan => 
            <li className="plan-list" key={plan.id}>
              <div className="dates">
                <Moment format="MM/DD/YY">{plan.from_date}</Moment> - <Moment format="MM/DD/YY">{plan.to_date}</Moment>
              </div>
              <div className="location">
                {plan.location}
              </div>
              <div className="notes">
                {plan.notes}
              </div>

              <Link to={`/edit/${plan.id}`}>
                <FontAwesomeIcon icon={faEdit} className="icon"></FontAwesomeIcon>
              </Link>
              
              <FontAwesomeIcon icon={faTrashAlt}
                  className="icon" 
                  type="button" 
                  onClick={() => this.handleDeletePlans(plan.id)}
                  ></FontAwesomeIcon>
            </li>
          )}
        </ul>
      </section>
    )
  }
}

export default PlansFromTrip;