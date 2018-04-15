import React from 'react';
import axios from 'axios';

class RequestInbox extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
      opened: false,
    };
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
    axios.put('/instagreen/follow/', { user_id: req.id, target_id: targetId }).then((success) => {
      // console.log(`request from ${req.username} accepted`, success.data);
      axios.get(`/instagreen/follow/${targetId}`).then((response) => {
        this.setState({ requests: response.data });
      });
    });
  }

  declineRequest(req) {
    const targetId = this.props.user_id;
    axios.delete(`/instagreen/follow/${req.id}/${targetId}`).then((success) => {
      // console.log(`request from ${req.username} declined`, success.data);
      axios.get(`/instagreen/follow/${targetId}`).then((response) => {
        this.setState({ requests: response.data });
      });
    });
  }

  render() {
    if (this.state.opened) {
      return (
        <div id="request-inbox">
          <i className="glyphicon glyphicon-envelope" onClick={() => { this.toggleInbox(); }} />
          {this.state.requests.length ? <span class="badge badge-secondary">Pending</span> : null}
          <table>
            <tbody>
              {this.state.requests.map((req) => {
                return (
                  <tr key={req.id}>
                    <td>{req.username}</td>
                    <td><button id="acc-btn" onClick={() => { this.acceptRequest(req); }}><i className="glyphicon glyphicon-ok"></i></button></td>
                    <td><button id="dec-btn" onClick={() => { this.declineRequest(req); }}><i className="glyphicon glyphicon-remove"></i></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div id="request-inbox">
          <i className="glyphicon glyphicon-envelope" onClick={() => { this.toggleInbox(); }} />
          {this.state.requests.length ? <span class="badge badge-secondary">Pending</span> : null}
      </div>
    );
  }
}

export default RequestInbox;
