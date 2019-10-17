import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from '../config';
import './App.css';
import ApiContext from '../ApiContext';
import AddTrip from '../AddTrip/AddTrip';
import LandingPage from '../LandingPage/LandingPage';
import AddPlans from '../AddPlans/AddPlans';
import PlansFromTrip from '../PlansFromTrip/PlansFromTrip';

class App extends Component {
  state = {
    trips: [],
    plans: [],
    isLoading: false
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
      .then(([trips, plans, isLoading]) => {
        this.setState({ trips, plans, isLoading: true });
      })
      .catch(error => {
        console.error({error});
      })
  };

  addNewTrip = (newTrip) => {
    this.setState({
      trips: [
        ...this.state.trips,
        newTrip
      ]
    })
  };

  addNewPlan = (newPlan) => {
    this.setState({
      plans: [
        ...this.state.plans,
        newPlan
      ]
    }, this.componentDidMount())
  }

  deleteTrip = tripId => {
    this.setState({
      trips: this.state.trips.filter(trip => trip.id !== tripId)
    })
  };

  deletePlan = planId => {
    this.setState({
      plans: this.state.plans.filter(plan => plan.id !== planId)
    })
  }

  render() {
    const value = {
      plans: this.state.plans,
      trips: this.state.trips,
      addNewTrip: this.addNewTrip,
      addPlan: this.addNewPlan,
      deleteTrip: this.deleteTrip,
      deletePlan: this.deletePlan
    }

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <Route exact path='/' component = {LandingPage} />
          <Route path='/add-trip' component={AddTrip} />
          <Route path='/trips/:tripId/displayPlans' component={PlansFromTrip} />
          <Route path='/trips/:tripId/addPlans' component={AddPlans} />
        </div>
      </ApiContext.Provider>
    )
  }
};

export default App;
