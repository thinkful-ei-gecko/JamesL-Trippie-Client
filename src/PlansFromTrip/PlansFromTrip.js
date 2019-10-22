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
    const { plans = [] } = this.context
    const plansForTrip = getPlansForTrip(plans, tripId)
    
    return(
      <section className="plans-container">
        <Link to="/home">
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="back-chev-plans"></FontAwesomeIcon>
        </Link>
        <h3 className="plans-head">Plans for 'trip'</h3>
        <Link to={`/trips/${tripId}/addPlans`}>
          <button 
            type="submit" 
            className="create-plans-btn">&#x2b;</button>
        </Link>
        <ul className="display-plans">
          {plansForTrip.map(plan => 
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
                <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
              </Link>
              
              <FontAwesomeIcon icon={faTrashAlt}
                  className="delete-plan-btn" 
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