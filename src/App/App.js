import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import config from '../config';
import './App.css';
import ApiContext from '../ApiContext';
import AddTrip from '../AddTrip/AddTrip';
import HomePage from '../HomePage/HomePage';
import LandingPage from '../LandingPage/LandingPage';
import EditPlans from '../EditPlans/EditPlans';
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
    }, this.componentDidMount())
  };

  updatePlan = revisedPlan => {
    const newPlans = this.state.plans.map(plan =>
      (plan.id === revisedPlan.id)
        ? Object.assign({}, plan, revisedPlan)
        : plan
    )
    this.setState({
      plans: newPlans
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
          <Route path='/home' component={HomePage} />
          <Route path='/add-trip' component={AddTrip} />
          <Route path='/trips/:tripId/displayPlans' component={PlansFromTrip} />
          <Route path='/trips/:tripId/addPlans' component={AddPlans} />
          <Route path='/edit/:planId' component={EditPlans} />
        </div>
      </ApiContext.Provider>
    )
  }
};

export default App;
