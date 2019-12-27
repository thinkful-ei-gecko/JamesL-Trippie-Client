import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends Component {
  state ={
    demo: false
  }
  handleDemo = () => {
    this.setState({demo: !this.state.demo}) 
  }
  render(){

    const demo = 
      <>
        <p>
          Click log in and use the following demo account!
          <br></br>Username: demo
          <br></br>Password: Password1!
        </p>
      </>

    return (
      <div className="landing-container">
        <h1>Welcome to Trippie!</h1>
        <p className="intro-para">Stay organized for your upcoming trips with this travel planner</p>
        <div className="landing-btns">
          <Link to="/register"><button className="signup-btn">Sign Up</button></Link>
          <Link to="/login"><button className="login-btn">Log In</button></Link>
          <button onClick={() => this.handleDemo()} className="demo-btn">Demo</button>
        
        <div className="demo-section">
          {this.state.demo ? demo : ''}
        </div>

        </div>
      </div>
    )
  }
}

export default LandingPage;