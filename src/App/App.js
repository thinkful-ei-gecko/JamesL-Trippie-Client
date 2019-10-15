import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import config from '../config';
import './App.css';

class App extends Component {
  state = {
    trips: [],
    plans: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/trips`),
      fetch(`${config.API_ENDPOINT}/plans`)
    ])
      .then(([tripsRes, plansRes]) => {
        if(!tripsRes.ok)
          return tripsRes.json().then(e => Promise.reject(e));
        if(!plansRes.ok)
          return plansRes.json().then(e => Promise.reject(e));

        return Promise.all([tripsRes.json(), plansRes.json()]);
      })
      .then(([trips, plans]) => {
        this.setState({ trips, plans });
      })
      .catch(error => {
        console.error({error});
      })
  };

  render() {


    return (
      <div className="App">
      
      </div>
    )
  }
}

export default App;
