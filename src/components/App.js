import React, { Component } from 'react'
import { Router } from 'react-router-dom'

import auth from '../Auth'
import history from '../history'
import Apollo from './Apollo'
import Layout from './Layout'

class App extends Component {
  render() {
    return (
      <Apollo>
        <Router history={history}>
          <Layout auth={auth} />
        </Router>
      </Apollo>
    )
  }
}

export default App
