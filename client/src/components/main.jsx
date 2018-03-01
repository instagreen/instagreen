import React from 'react';
import axios from 'axios';

import App from './app.jsx';
import NavBar from './navbar.jsx';
import router from '../clientRouter.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user_id: null,
    };
  }

  componentDidMount() {
    axios.get('/instagreen/verify').then((response) => {
      console.log('---response back to CDM', response);
      if (response.data === 'invalid user session') {
        router.setRoute('login');
      } else {
        this.setState({ isLoading: false, user_id: response.data[0].id });
      }
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div>
         Loading...
        </div>
      );
    }
    return (
      <div>
        <NavBar />
        <App user_id={this.state.user_id} />
      </div>
    );
  }
}

export default Main;
