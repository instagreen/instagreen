import React from 'react';
import axios from 'axios';

import router from '../clientRouter.jsx';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      invalidUsernamePasswordError: '',
      signupAlertMessage: '',
      bootstrapClassStatusType: '',
      displaySuccessPanel: 'hidden-element',
      displayFailurePanel: 'hidden-element',
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
      if (response.data === true) {
        router.setRoute('app');
      } else if (response.data === false) {
        this.setState({ invalidUsernamePasswordError: 'password' });
        this.setState({ displayFailurePanel: 'visible-element' });
        setTimeout((() => {
          this.setState({ displayFailurePanel: 'hidden-element' });
        }).bind(this), 2000);
        router.setRoute('login');
      } else {
        this.setState({ invalidUsernamePasswordError: 'username' });
        this.setState({ displayFailurePanel: 'visible-element' });
        setTimeout((() => {
          this.setState({ displayFailurePanel: 'hidden-element' });
        }).bind(this), 2000);        
      }
    });
  }

  doSignUp() {
    axios.post('/instagreen/signup', {
      username: this.state.username,
      password: this.state.password,
    }).then((response) => {
      if (response.data.length > 0) {
        this.setState({ signupAlertMessage: `Account successfully created for ${response.data[0].username}` });
        this.setState({ bootstrapClassStatusType: 'alert-success' });
        this.setState({ displaySuccessPanel: 'visible-element' });
        setTimeout((() => {
          this.setState({ displaySuccessPanel: 'hidden-element' });
        }).bind(this), 2000);
      } else {
        this.setState({ signupAlertMessage: 'Username already taken.' });
        this.setState({ bootstrapClassStatusType: 'alert-danger' });
        this.setState({ displaySuccessPanel: 'visible-element' });
        this.setState({ displaySuccessPanel: 'visible-element' });
        setTimeout((() => {
          this.setState({ displaySuccessPanel: 'hidden-element' });
        }).bind(this), 2000);        
      }
    });
  }

  handleSignUpClick() {
    this.setState({ currentComponent: 'signup' });
  }

  handleLogInClick() {
    this.setState({ currentComponent: 'login' });
  }

  render() {
    if (this.state.currentComponent === 'login') {
      return (
        <div id="parent" align="center">
        <p className={`alert login-message alert-danger alert-operation ${this.state.displayFailurePanel}`}>Invalid {this.state.invalidUsernamePasswordError}! #PackYourBags</p>
          <div>
            <h2 id="header">Instagreen</h2>
          </div>
          <div>
            <input className="input_field" type="text" placeholder="Username" value={this.state.username} onChange={e => this.setUsername(e)} />
            <input className="input_field" type="password" placeholder="Password" value={this.state.password} onChange={e => this.setPassword(e)} />
            <button className="input_field" onClick={() => this.doLogIn()}>Log In</button>
          </div>
          <div id="redirect_html">
            Don't have an account? <a href="#" onClick={() => { this.handleSignUpClick(); }}> Sign Up </a>
          </div>
        </div>
      );
    }
    if (this.state.currentComponent === 'signup') {
      return (
        <div id="parent" align="center">
          <p className={`alert login-message ${this.state.bootstrapClassStatusType} alert-operation ${this.state.displaySuccessPanel}`}>{this.state.signupAlertMessage}</p>
          <div>
            <h2 id="header">Instagreen</h2>
          </div>
          <div>
            <input className="input_field" type="text" placeholder="Username" value={this.state.username} onChange={e => this.setUsername(e)} />
            <input className="input_field" type="password" placeholder="Password" value={this.state.password} onChange={e => this.setPassword(e)} />
            <button className="input_field" onClick={() => this.doSignUp()}>Sign Up</button>
          </div>
          <div id="redirect_html">
            Have an account? <a href="#" onClick={() => { this.handleLogInClick(); }}> Log In </a>
          </div>
        </div>
      );
    }
  }
}

export default LogIn;
