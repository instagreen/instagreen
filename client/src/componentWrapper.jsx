import React, { Component } from 'react';
import axios from 'axios';
import router from './clientRouter.jsx';
import NavBar from './components/navbar.jsx';

const wrapComponentWithMain = ComponentToWrap => class extends Component {
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
    console.log('---entering WrapComponent');
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
        <ComponentToWrap user_id={this.state.user_id} />
      </div>);
  }
};

export default wrapComponentWithMain;

