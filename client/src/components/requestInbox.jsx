import React from 'react';
import axios from 'axios';

class RequestInbox extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
      opened: false,
      requester: null,
    };
    this.toggleInbox = this.toggleInbox.bind(this);
  }

  componentDidMount() {
    const targetId = this.props.user_id;
    axios.get(`/instagreen/follow/${targetId}`).then((response) => {
      this.setState({ requests: response.data });
    });
  }

  toggleInbox() {
    if (this.state.opened) {
      this.setState({ opened: false });
    } else {
      this.setState({ opened: true });
    }
  }

  acceptRequest(req) {
    const targetId = this.props.user_id;
    axios.put('/instagreen/follow/', { user_id: req.id, target_id: targetId }).then((response) => {
      console.log(`request from ${req.username} accepted`, response.data);
    });
  }

  declineRequest(req) {
    const targetId = this.props.user_id;
    axios.delete(`/instagreen/follow/${req.id}/${targetId}`).then((response) => {
      console.log(`request from ${req.username} declined`, response.data);
    });
  }

  render() {
    if (this.state.opened) {
      return (
        <div>
          <button onClick={() => { this.toggleInbox(); }}>View Requests</button>
          {this.state.requests.map((req) => {
            return (
              <li key={req.id}>
                {req.username}
                <button onClick={() => { this.acceptRequest(req); }}>Accept</button>
                <button onClick={() => { this.declineRequest(req); }}>Decline</button>
              </li>
            );
          })}
        </div>
      );
    }
    return (
      <div>
        <button onClick={() => { this.toggleInbox(); }}>View Requests</button>
      </div>
    );
  }
}

export default RequestInbox;
