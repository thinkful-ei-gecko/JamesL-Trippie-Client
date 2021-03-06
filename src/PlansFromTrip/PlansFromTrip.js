import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';
import Moment from 'react-moment';
import TokenService from '../Service/Token-service';
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

  state = {
    plans: [],
    trips: []
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/trips`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/plans`)
    ])
      .then(([tripsRes, plansRes]) => {
        if(!tripsRes.ok)
          return tripsRes.json().then(e => Promise.reject(e));
        if(!plansRes.ok)
          return plansRes.json().then(e => Promise.reject(e));

        return Promise.all([tripsRes.json(), plansRes.json()]);
      })
      .then(([trips, plans, isLoading]) => {
        const specificPlans = getPlansForTrip(plans, this.props.match.params.tripId)
        this.setState({ trips, plans: specificPlans, isLoading: true })
      })
      .catch(error => {
        console.error({error});
      })
  };

  deletePlan = planId => {
    this.setState({
      plans: this.state.plans.filter(plan => plan.id !== planId)
    })
  };

  handleDeletePlans = planId => {
    deletePlanFetch(planId)
      .then(res => {
        if(!res.ok)
          return res.json()
          .then(e => Promise.reject(e))
      })
      .then(() => {
        this.deletePlan(planId)
      })
      .catch(error => {
        console.error({error})
      })
  }

  render() {
    const { tripId } = this.props.match.params
    const {plans, trips} = this.state
    const trip = trips.find(trip => trip.id === Number(tripId)) || {}
    const sortedTrip = this.state.plans.sort(function(a, b) {
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
                <Moment utc format="MM/DD/YY">{plan.from_date}</Moment> - <Moment utc format="MM/DD/YY">{plan.to_date}</Moment>
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