import React from 'react'
import ReactDOM from 'react-dom'

import UserList from '../containers/user-list.jsx';
import UserDetail from '../containers/user-detail.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>UserList</h1>
        <UserList/>
        <hr/>
        <h1>UserDetail</h1>
        <UserDetail/>
      </div>
    )
  }
}

export default App;
