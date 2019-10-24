import React, { Component } from 'react';
import { Section } from '../Utils/Utils';
import Registration from '../Registration/Registration';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Registration.css';
import { Link } from 'react-router-dom';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegisterSuccess = user => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <Section className='registration-page'>
        <Link to="/">
          <FontAwesomeIcon icon={faAngleDoubleLeft} className="back-chev-plans"></FontAwesomeIcon>
        </Link>

        <h2>Register With Trippie!</h2>
        <Registration
          onRegisterSuccess={this.handleRegisterSuccess}
        />
      </Section>
    )
  }
}