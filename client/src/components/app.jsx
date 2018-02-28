import React from 'react';
import ReactDOM from 'react-dom';

import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';
import Feed from './feed.jsx';
import apiCaller from './../apiCaller.js';
import Profile from './profile.jsx';
import NavBar from './navbar.jsx';
import DropzoneComponent from 'react-dropzone-component';
// import eventHandlers from './dropUpload.jsx'
import componentConfig from './dropUpload.jsx'


const eventHandlers = { // these are callbacks that would fire on the following events
  addedfile: file => console.log('fiiiile: ', file),
  success: (file, responseFromServer) => {
    // responseFromServer[0] is the created post we get back from the server
    console.log(responseFromServer);
    // in here we can update the state of our app or add the post somewhere
  },
};

const djsConfig = {
  addRemoveLinks: true,
  params: { // ============ this is where our description and user_id would go
    description: "I'm a parameter!",
    user_id: 1,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      user_id: this.props.user_id,
      username: '',
    };
  }
  componentDidMount() {
    apiCaller.getUserInfo(this.state.user_id, (userInfo) => {
      this.setState({
        username: userInfo.data[0].username,
        user_id: userInfo.data[0].id,
      });
    });

    apiCaller.getFeed(this.state.user_id, (response) => {
      this.setState({
        feed: response.data,
      });
    });
  }


  render() {
    console.log('---PROPS.USER_ID from APP!!!---', this.props.user_id);
    return (
      <div>
        <NavBar />
        <Feed username={this.state.username} user_id={this.state.user_id} feed={this.state.feed} />
        
        <DropzoneComponent config={componentConfig} djsConfig={djsConfig} eventHandlers={eventHandlers} />
      </div>
    );
  }
}

export default App;
