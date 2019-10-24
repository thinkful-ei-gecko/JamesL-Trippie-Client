import React, { Component } from 'react'
import AuthApiService from '../Service/Auth-api-service';
import TokenService from '../Service/Token-service';
import { Button, Input } from '../Utils/Utils';


export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitAuth = e => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state
    return (

      <form className='login-form' onSubmit={this.handleSubmitAuth} >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='username'>
          <label htmlFor='LoginForm__username'>
            Username
          </label>
          <Input
            name='username'
            id='LoginForm__username'>
          </Input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <Input
            name='password'
            type='password'
            id='LoginForm__password'>
          </Input>
        </div>
        <Button type='submit'>
          Login
        </Button>
      </form>

    )
  }
};