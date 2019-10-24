import React, { Component } from 'react';
import LoginForm from '../Login/LoginForm';
import './Login.css';
import { Section } from '../Utils/Utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';


export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/home'
    history.push(destination)
  }

  render() {
    return (
      <Section className='login-page'>
        <Link to="/">
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="back-chev-plans"></FontAwesomeIcon>
        </Link>

        <h2>Login To Your Account!</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </Section>
    )
  }
};