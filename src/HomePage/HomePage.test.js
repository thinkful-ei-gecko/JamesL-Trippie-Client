import React from 'react';
import ReactDOM from 'react-dom';
import config from '../config';
import TokenService from '../Service/Token-service';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';

it('renders without crashing', () => {

  const fetchTripsAndPlans = () => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/trips`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/plans`)
    ])
      .then(([tripsRes, plansRes]) => {
        if(!tripsRes.ok)
          return tripsRes.json().then(e => Promise.reject(e));
        if(!plansRes.ok)
          return plansRes.json().then(e => Promise.reject(e));

        return Promise.all([tripsRes.json(), plansRes.json()]);
      })
      .then(([trips, plans, isLoading]) => {
        this.setState({ trips, plans, isLoading: true })
      })
      .catch(error => {
        console.error({error});
      })
  };
  const div = document.createElement('div');

  ReactDOM.render(<Router><HomePage fetch = {fetchTripsAndPlans}/></Router>, div);

  ReactDOM.unmountComponentAtNode(div);
});