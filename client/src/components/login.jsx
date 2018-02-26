import React from 'react';
import axios from 'axios';

import App from './app.jsx';
import SignUp from './signup.jsx';

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      match: false,
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
    let username = this.state.username;
    let password = this.state.password;
    axios.post('/instagreen/login', { username, password }).then((response) => {
      console.log('response', response);
      if (response.data.length === 0) {
        console.log("try again!!!");
        this.setState({ match: false });
      } else {
        this.setState({ match: true });
      }
    });
  }

  render() {
    if (this.state.match === true) {
      return <App />;
    } else {
      return (
        <div>hello from Log In
          <input type="text" value={this.state.username} onChange={e => this.setUsername(e)} />
          <input type="text" value={this.state.password} onChange={e => this.setPassword(e)} />
          <button onClick={() => this.submitForm()}>LOG IN</button>
          <hr />
          Dont't Have An Account?
          <SignUp />
        </div>
      );
    }
  }
}

export default LogIn;
