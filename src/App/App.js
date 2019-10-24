import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from '../config';
import './App.css';
import ApiContext from '../ApiContext';
import TokenService from '../Service/Token-service';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../Login/LoginPage';
import RegisterPage from '../Registration/RegisterPage';
import HomePage from '../HomePage/HomePage';
import AddTrip from '../AddTrip/AddTrip';
import PlansFromTrip from '../PlansFromTrip/PlansFromTrip';
import AddPlans from '../AddPlans/AddPlans';
import EditPlans from '../EditPlans/EditPlans';

class App extends Component {
  state = {
    trips: [],
    plans: [],
    isLoading: false
  };

  fetchTripsAndPlans = () => {
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

  addNewTrip = newTrip => {
    this.setState({
      trips: [
        ...this.state.trips,
        newTrip
      ]
    })
  };

  addNewPlan = newPlan => {
    this.setState({
      plans: [
        ...this.state.plans,
        newPlan
      ]
    })
  };

  deleteTrip = tripId => {
    this.setState({
      trips: this.state.trips.filter(trip => trip.id !== tripId)
    })
  };

  deletePlan = planId => {
    this.setState({
      plans: this.state.plans.filter(plan => plan.id !== planId)
    })
  };

  render() {
    const value = {
      plans: this.state.plans,
      trips: this.state.trips,
      addNewTrip: this.addNewTrip,
      addPlan: this.addNewPlan,
      updatePlan: this.updatePlan,
      deleteTrip: this.deleteTrip,
      deletePlan: this.deletePlan
    }

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/home' render={ () => <HomePage fetch = {this.fetchTripsAndPlans} /> } />
          <Route path='/:userId/add-trip' component={AddTrip} />
          <Route path='/trips/:tripId/displayPlans' component={PlansFromTrip} />
          <Route path='/trips/:tripId/addPlans' component={AddPlans} />
          <Route path='/edit/:planId' component={EditPlans} />
        </div>
      </ApiContext.Provider>
    )
  }
};

export default App;
