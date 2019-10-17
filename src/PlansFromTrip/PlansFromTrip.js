import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';

class PlansFromTrip extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeletePlans = e => {
    const planId = e
    
    fetch(`${config.API_ENDPOINT}/plans/${planId}`, {
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
        this.context.deletePlan(planId)
      })
      .catch(error => {
        console.error({error})
      })
  }

  getPlansForTrip = (plans = [], tripId) => (
    (!tripId)
      ? plans
      : plans.filter(plan => plan.trip_id === Number(tripId))
  )

  render() {
    const { tripId } = this.props.match.params
    const { plans = [] } = this.context
    const plansForTrip = this.getPlansForTrip(plans, tripId)
    
    return(
      <section className="plans-container">
        <Link to="/">
        <button className="go-back-btn">Back</button>
        </Link>
        <ul>
          {plansForTrip.map(plan => 
            <li key={plan.id}>
              {plan.location}
              {plan.from_date}
              {plan.to_date}
              {plan.notes}
              <button 
                className="delete-btn"
                type="button"
                onClick={() => this.handleDeletePlans(plan.id)}
                >&#x2715;</button>
            </li>
          )}
        </ul>
      </section>
    )
  }
}

export default PlansFromTrip;