import React, { Component } from 'react'
import './App.scss'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import Firebase from 'firebase'
import Main from './components/Main'

class App extends Component {
  render () {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Main} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
