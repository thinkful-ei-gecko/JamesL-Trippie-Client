import React, { Component } from 'react';
import './Registration.css';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../Service/Auth-api-service';

class Registration extends Component {
  static defaultProps = {
    onRegisterSuccess: () => {}
  }
  
  state = {
    error: null
  }

  handleRegisterSubmit = e => {
    e.preventDefault()
    const { fullname, username, password } = e.target

    this.setState({
      error: null
    })
    
    AuthApiService.postUser({
      username: username.value,
      fullname: fullname.value,
      password: password.value
    })
      .then(user => {
        username.value = ''
        fullname.value = ''
        password.value = ''
        this.props.onRegisterSuccess()
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  render() {
    const {error} = this.state

    return(
      <form
        className='registration-form'
        onSubmit={this.handleRegisterSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='full_name'>
          <label htmlFor='RegistrationForm__full_name'>
            Name <Required />
          </label>
          <Input
            name='fullname'
            type='text'
            required
            id='RegistrationForm__full_name'>
          </Input>
        </div>
        <div className='username'>
          <label htmlFor='RegistrationForm__username'>
            Username <Required />
          </label>
          <Input
            name='username'
            type='text'
            required
            id='RegistrationForm__username'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='RegistrationForm__password'>
            Password <Required />
          </label>
          <Input
            name='password'
            type='password'
            required
            id='RegistrationForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Sign Up
        </Button>
      </form>
    )
  }
}

export default Registration;