import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';

class PlansFromTrip extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  getPlansForTrip = (plans = [], tripId) => (
    (!tripId)
      ? plans
      : plans.filter(plan => plan.trip_id === Number(tripId))
  )

  render() {
    const { tripId } = this.props.match.params
    const { plans = [] } = this.context
    const plansForTrip = this.getPlansForTrip(plans, tripId)
    console.log(plans)
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
              <button className="delete-btn">&#x2715;</button>
            </li>
          )}
        </ul>
      </section>
    )
  }
}

export default PlansFromTrip;