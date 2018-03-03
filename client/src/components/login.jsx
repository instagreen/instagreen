import React from 'react';
import axios from 'axios';

import router from '../clientRouter.jsx';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
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
        console.log('Invalid username/password combination !!!, response.data', response.data);
      } else {
        console.log('Login successful: ', response.data);
        router.setRoute('app');
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
    if (this.state.currentComponent === 'login') {
      return (
        <div id="parent" align="center">
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

// Background styling for later
// 'http://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Misty-Nature-Forest-Fog-Wallpaper-PIC-WPB004382.jpg'
// https://facebook.github.io/react-native/docs/image.html#background-image-via-nesting
