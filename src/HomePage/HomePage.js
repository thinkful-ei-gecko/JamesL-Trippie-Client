import React, { Component } from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import TokenService from '../Service/Token-service';
import Header from '../Header/Header';
import DisplayTrips from '../DisplayTrips/DisplayTrips';

class HomePage extends Component {

  componentDidMount() {
    this.props.fetch()
  }

  handleLogout= () => {
    TokenService.clearAuthToken()
  };

  render(){
    return (
      <div className="homepage">
        <div className="logout">
          <Link to='/' onClick={this.handleLogout}>
            <button className="logout-btn">Sign Out</button>
          </Link>
        </div>

        <Header />
        <DisplayTrips />
      </div>
    )
  }
};

export default HomePage;