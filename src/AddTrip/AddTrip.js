import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';

class AddTrip extends Component {
  state = {
    trip_title: ''
  }

  static contextType = ApiContext;

  handleAddTrip = (e) => {
    e.preventDefault();

    const newTrip = {
      trip_title: this.state.trip_title
    };

    fetch(`${config.API_ENDPOINT}/trips`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newTrip)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json()
      })
      .then((trip) => {
        this.context.addNewTrip(trip);
        this.props.history.push('/');
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
        <Link to="/">
        <button className="go-back-btn">Back</button>
        </Link>
        <form className='addTripForm' onSubmit={e => this.handleAddTrip(e)}>
          <div>
            <label htmlFor="tripTitle">New Trip Title: </label>
            <input type="text" id="tripTitle" value={this.state.trip_title} onChange={ this.getTripTitle } />
            {this.validateTripTitle && <p className='validationElement'>{this.validateTripTitle()}</p>}
            <button disabled={this.validateTripTitle()} type="submit">Submit</button>
          </div>
        </form>
      </section>
    );
  }
}

// AddNewTrip.propTypes = {
//   history: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired
// }

export default AddTrip;