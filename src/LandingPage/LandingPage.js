import React, { Component } from 'react';
import Header from '../Header/Header';
import DisplayTrips from '../DisplayTrips/DisplayTrips';

import ApiContext from '../ApiContext';

class LandingPage extends Component {
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

export default LandingPage;