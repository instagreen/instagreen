import React from 'react';
import axios from 'axios';

import App from './app.jsx';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      user_id: null,
      match: false,
      currentComponent: 'login',
    };
  }
  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  doLogIn() {
    const { username, password } = this.state;
    axios.post('/instagreen/login', { username, password }).then((response) => {
      if (response.data.length === 0) {
        console.log('Invalid username/password combination !!!');
        this.setState({ match: false });
      } else {
        console.log('Login successful: ', response.data);
        this.setState({ match: true, user_id: response.data[0].id });
      }
    });
  }

  doSignUp() {
    axios.post('/instagreen/signup', {
      username: this.state.username,
      password: this.state.password,
    }).then(response => console.log('--response', response));
  }

  handleSignUpClick() {
    this.setState({ currentComponent: 'signup' });
  }

  handleLogInClick() {
    this.setState({ currentComponent: 'login' });
  }

  render() {
    if (this.state.match === true) {
      return <App user_id={this.state.user_id} />;
    }
    if (this.state.currentComponent === 'login') {
      return (
        <div>
          <input type="text" value={this.state.username} onChange={e => this.setUsername(e)} />
          <input type="text" value={this.state.password} onChange={e => this.setPassword(e)} />
          <button onClick={() => this.doLogIn()}>LOG IN</button>
          <hr />
          Dont have an account? <a href='#' onClick={() => {this.handleSignUpClick()}}> Sign Up </a>
        </div>
      );
    }
    if (this.state.currentComponent === 'signup') {
      return (
        <div>
          <input type="text" value={this.state.username} onChange={e => this.setUsername(e)} />
          <input type="text" value={this.state.password} onChange={e => this.setPassword(e)} />
          <button onClick={() => this.doSignUp()}>SIGN UP</button>
          <hr />
           Already have an account? <a href='#' onClick={() => {this.handleLogInClick()}}> Log In </a>
        </div>
      );
    }
  }
}

export default LogIn;
