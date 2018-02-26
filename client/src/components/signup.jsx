import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
    console.log('state username', this.state.username);
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
    console.log('state password', this.state.password);
  }

  submitForm() {
    axios.post('/instagreen/signup', { 
      username: this.state.username,
      password: this.state.password,
    }).then(response => console.log('--response', response));
  }

  render() {
    return (
      <div>hello from Sign Up
        <input type="text" value={this.state.username} onChange={e => this.setUsername(e)} />
        <input type="text" value={this.state.password} onChange={e => this.setPassword(e)} />
        <button onClick={() => this.submitForm()}>SIGN UP</button>
      </div>
    );
  }
}

export default SignUp;
