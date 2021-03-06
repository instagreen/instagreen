import React, { Component } from 'react';
import axios from 'axios';
import router from './clientRouter.jsx';
import NavBar from './components/navbar.jsx';

const wrapComponent = ComponentToWrap => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user_id: null,
    };
  }
  componentDidMount() {
    axios.get('/instagreen/verify').then((response) => {
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
        <ComponentToWrap user_id={this.state.user_id} authorId={this.props.authorId} />
      </div>);
  }
};

export default wrapComponent;

