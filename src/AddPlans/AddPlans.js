import React, { Component } from 'react';
import config from '../config';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';

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
    console.log(newPlan)

    fetch(`${config.API_ENDPOINT}/plans`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newPlan)
    })
      .then(res => {
        if(!res.ok) return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((newPlan) => {
        console.log(newPlan)
        this.context.addPlan(newPlan)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error({error})
      })
  }

  onChangeHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <section className="container">
        <Link to="/">
          <button className="go-back-btn">Back</button>
        </Link>
        <h3>Create Plans</h3>
        <p>Enter information on what you want to do!</p>
        <form className="addPlansToTrip" onSubmit={e => this.handleAddPlans(e)}>
            <label htmlFor="plan-location-entry">Location: </label>
            <input name="location" type="text" id="plan-location-entry" onChange={this.onChangeHandle} />
            <label htmlFor="from-date-entry">From Date: </label>
            <input name="from_date" type="date" onChange={this.onChangeHandle} />
            <label htmlFor="to-date-entry">To Date: </label>
            <input name="to_date" type="date" onChange={this.onChangeHandle} />
            <label htmlFor="plan-notes-entry">Notes: </label>
            <textarea name="notes" type="text" id="plan-notes-entry" onChange={this.onChangeHandle} />
            <button type="submit">Submit</button>
        </form>

      </section>
    )
  }


}

export default AddPlans;