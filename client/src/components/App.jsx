import React from 'react'
import ReactDOM from 'react-dom'

import UserList from '../containers/user-list.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello From APP</h1>
        <UserList/>
      </div>
    )
  }
}

export default App;
