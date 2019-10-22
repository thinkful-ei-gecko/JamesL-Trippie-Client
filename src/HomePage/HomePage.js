import React, { Component } from 'react';
import './Homepage.css'
import Header from '../Header/Header';
import DisplayTrips from '../DisplayTrips/DisplayTrips';

import ApiContext from '../ApiContext';

class HomePage extends Component {
  static contextType = ApiContext;
  render(){
    return (
      <>
        <Header />
        <DisplayTrips trips={this.context.trips}/>
      </>
    )
  }
}

export default HomePage;