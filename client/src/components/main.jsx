import React from 'react';
import axios from 'axios';

import App from './app.jsx';
import router from '../clientRouter.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    axios.get('/instagreen/curr').then((response) => {
      console.log('---response', response);
      if (response.data === 'no user') {
        router.setRoute('login');
      } else {
        this.setState({ isLoading: false });
      }
    });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <div>
         Loading....
        </div>
      );
    }
    return <App />;
  }
}

export default Main;
