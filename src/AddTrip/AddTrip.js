import React, { Component } from "react";
import ApiContext from "../ApiContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import './AddTrip.css';
import { addTripFetch } from "../Service/Service";
import { Link } from 'react-router-dom';

class AddTrip extends Component {
  state = {
    trip_title: ''
  }

  static contextType = ApiContext;

  handleAddTrip = (e) => {
    e.preventDefault();

    const newTrip = {
      trip_title: this.state.trip_title,
      user_id: this.props.match.params.userId
    };

    addTripFetch(newTrip)
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json()
      })
      .then((trip) => {
        this.context.addNewTrip(trip);
        this.props.history.push('/home');
      })
      .catch(error => {
        console.error({ error });
      });
  };

  getTripTitle = (e) => {
    this.setState({trip_title: e.target.value});
  }

  validateTripTitle = () => {
    let tripTitle = this.state.trip_title;

    if (!tripTitle) {
        return 'Trip title is required'
    } else {
        return null
    }
}

  render() {
    return (
      <section className="add-trip-container">
        <Link to="/home">
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="back-chev"></FontAwesomeIcon>
        </Link>
        <form className='add-trip-form' onSubmit={e => this.handleAddTrip(e)}>
          <div>
            <label className="title-label" htmlFor="trip-title">New Trip Title: </label>
            <input type="text" id="trip-title" value={this.state.trip_title} onChange={ this.getTripTitle } />
            {this.validateTripTitle && <p className='validation-element'>{this.validateTripTitle()}</p>}
            <button className="submit-title" disabled={this.validateTripTitle()} type="submit">Submit</button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddTrip;