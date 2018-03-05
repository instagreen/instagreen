import React from 'react';
import axios from 'axios';

import router from '../clientRouter.jsx';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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
        // render the failure message
        this.setState({ displayFailurePanel: 'visible-element' });
        // display it for 2 seconds and hide it
        setTimeout((() => {
          this.setState({ displayFailurePanel: 'hidden-element' });
        }).bind(this), 2000);
        router.setRoute('login');
      } else {
        console.log(response.data); // message for Arthur
      }
    });
  }

  doSignUp() {
    axios.post('/instagreen/signup', {
      username: this.state.username,
      password: this.state.password,
    }).then(() => {
      // render the success message
      this.setState({ displaySuccessPanel: 'visible-element' });
      // display it for 2 seconds and hide it
      setTimeout((() => {
        this.setState({ displaySuccessPanel: 'hidden-element' });
      }).bind(this), 2000);
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
        <p className={`alert login-message alert-danger alert-operation ${this.state.displayFailurePanel}`}>Invalid username/password combination! #PackYourBags</p>
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
        <p className={`alert login-message alert-success alert-operation ${this.state.displaySuccessPanel}`}>Account for {this.state.username} has been created!</p>
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
