import React from 'react'
import ReactDOM from 'react-dom'
import List from './components/List.jsx'

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Worlds</h1>
        <List/>
      </div>
    )
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)