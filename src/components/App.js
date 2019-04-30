import React, { Component } from 'react'
import { Router } from 'react-router-dom'

import auth from '../Auth'
import history from '../history'
import Layout from './Layout'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Layout auth={auth} />
      </Router>
    )
  }
}

export default App
