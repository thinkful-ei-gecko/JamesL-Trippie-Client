import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import '../AddPlans/AddPlans.css';
import config from '../config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

class EditPlans extends Component {
  static contextType = ApiContext;

  state = {
    id: '',
    location: '',
    from_date: '',
    to_date: '',
    notes: '',
    tripId: ''
  }

  componentDidMount() {
    const { planId } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/plans/${planId}`, {
      method: 'GET',
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if(!res.ok)
          return res.json().then(e => Promise.reject(e))

        return res.json()
      })
      .then(resData => {
        this.setState({
          id: resData.id,
          location: resData.location,
          from_date: resData.from_date,
          to_date: resData.to_date,
          notes: resData.notes,
          tripId: resData.trip_id
        })
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

  handleSubmit = e => {
    e.preventDefault()
    const { planId } = this.props.match.params
    const { id, location, from_date, to_date, notes } = this.state
    const newPlan = { id, location, from_date, to_date, notes }
    fetch(`${config.API_ENDPOINT}/plans/${planId}`, {
      method: 'PATCH',
      body: JSON.stringify(newPlan),
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.context.updatePlan(newPlan)
        this.props.history.push(`/trips/${this.state.tripId}/displayPlans`)
      })
      .catch(error => {
        console.error({error})
      })
  }

  handleCancel = () => {
    this.props.history.push(`/trips/${this.state.tripId}/displayPlans`)
  };

  render() {

    return(
      <section className="edit-plan">
        <FontAwesomeIcon icon={faAngleDoubleLeft} 
          className="back-chev-plans"
          onClick={this.handleCancel}
        ></FontAwesomeIcon>

        <h2 className="edit-plan-headtag">Edit Plan</h2>
        <form className="add-plans-form" onSubmit={this.handleSubmit}>
          <label htmlFor="plan-location-entry">Location / Title: </label>
          <input name="location" value={this.state.location} type="text" id="plan-location-entry" onChange={this.onChangeHandle} required />
          <label htmlFor="from-date-entry">From Date: </label>
          <input name="from_date" value={this.state.from_date} type="date" onChange={this.onChangeHandle} />
          <label htmlFor="to-date-entry">To Date: </label>
          <input name="to_date" value={this.state.to_date} type="date" onChange={this.onChangeHandle} />
          <label htmlFor="plan-notes-entry">Notes: </label>
          <textarea name="notes" value={this.state.notes} type="text" id="plan-notes-entry" rows="4" onChange={this.onChangeHandle} required />
          <button type="submit" className="submit-new-btn">Submit</button>        
        </form>
      </section>
    )
  }
};

export default EditPlans;