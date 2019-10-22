import React, { Component } from 'react';
import './AddPlans.css';
import ApiContext from '../ApiContext';
import { addPlanFetch } from '../Service/Service';

class AddPlans extends Component {
  state = {
    location: '',
    from_date: '',
    to_date: '',
    notes: '',
  }

  static contextType = ApiContext

  handleAddPlans = (e) => {
    e.preventDefault();

    const newPlan = {
      location: this.state.location,
      from_date: this.state.from_date,
      to_date: this.state.to_date,
      notes: this.state.notes,
      trip_id: this.props.match.params.tripId
    }

    addPlanFetch(newPlan)
      .then(res => {
        if(!res.ok) return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((newPlan) => {
        this.context.addPlan(newPlan)
        this.props.history.push(`/trips/${this.props.match.params.tripId}/displayPlans`)
      })
      .catch(error => {
        console.error({error})
      })
  };

  onChangeHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleCancel = () => {
    this.props.history.push(`/trips/${this.props.match.params.tripId}/displayPlans`)
  };

  render() {
    return (
      <section className="add-plans-container">

        <button className="go-back-btn" onClick={this.handleCancel}>Back</button>

        <h3>Create Plans</h3>
        <p>Enter information on what you want to do!</p>
        <form className="addPlansToTrip" onSubmit={e => this.handleAddPlans(e)}>
            <label htmlFor="plan-location-entry">Location: </label>
            <input name="location" type="text" id="plan-location-entry" onChange={this.onChangeHandle} required />
            <label htmlFor="from-date-entry">From Date: </label>
            <input name="from_date" type="date" onChange={this.onChangeHandle} />
            <label htmlFor="to-date-entry">To Date: </label>
            <input name="to_date" type="date" onChange={this.onChangeHandle} />
            <label htmlFor="plan-notes-entry">Notes: </label>
            <textarea name="notes" type="text" id="plan-notes-entry" onChange={this.onChangeHandle} required />
            <button type="submit">Submit</button>
        </form>
      </section>
    )
  }
}

export default AddPlans;