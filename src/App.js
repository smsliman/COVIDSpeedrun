import React, { Component } from 'react'
import './App.scss'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

import Main from './components/Main'
import TotalLeaderboard from './components/TotalLeaderboard'
import 'react-bootstrap/dist/react-bootstrap.min.js'
import './assets/Source_Sans_Pro/SourceSansPro-Black.ttf'
import './assets/Raleway/static/Raleway-Black.ttf'

class App extends Component {
  render () {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/leaderboard' component={TotalLeaderboard} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
