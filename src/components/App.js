import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import Auth from '../Auth'
import history from '../history'
import Callback from './Callback'
import Home from './Home'
import NavBar from './NavBar'

const auth = new Auth()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <>
          <NavBar />

          <Route path="/" render={props => <Home auth={auth} {...props} />} />
          <Route
            path="/callback"
            render={props => {
              if (/access_token|id_token|error/.test(props.location.hash)) {
                auth.handleAuthentication()
              }
              return <Callback {...props} />
            }}
          />
        </>
      </Router>
    )
  }
}

export default App
