import React, { Component } from 'react';
import ApiContext from '../ApiContext';

class DisplayPlans extends Component {
  static contextType = ApiContext;
  render() {
    return (
      <div className="plans-list">
        <ul>
          {this.context.plans.map(plan => 
            <li key={plan.id}>
              {plan.location}
              {plan.from_date}
              {plan.to_date}
              {plan.notes}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default DisplayPlans;