import React from 'react';
import axios from 'axios';

class RequestInbox extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
    };
  }

  componentDidMount() {
    const targetId = this.props.user_id;
    axios.get(`/instagreen/follow/${targetId}`).then((response) => {
      console.log('from Inbox', response);
      this.setState({ requests: response.data });
      console.log('state', this.state.requests);
    });
  }

  render() {
    console.log('this.props.user_id', this.props.user_id);
    return (
      <div>
        Hello from Inbox
      </div>
    );
  }
}

export default RequestInbox;
