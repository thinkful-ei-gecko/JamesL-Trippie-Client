import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends Component {
  render(){
    return (
      <div className="landing-container">
        <h1>Welcome to Trippie!</h1>
        <p className="intro-para">Stay organized for your upcoming trips with this travel planner</p>
        <div className="landing-btns">
          <Link to="/register"><button className="signup-btn">Sign Up</button></Link>
          <Link to="/login"><button className="login-btn">Log In</button></Link>
        </div>
      </div>
    )
  }
}

export default LandingPage;