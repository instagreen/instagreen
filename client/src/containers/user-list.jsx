import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserList extends Component {
  render() {
    return (
      <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
      </ul>
    );
  }
}

// takes app store, passes it in to component as prop
function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(UserList);

