import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'

import auth from '../Auth'
import history from '../history'
import Callback from './Callback'
import Home from './Home'
import CohortPage from './CohortPage'
import Profile from './Profile'
import Apollo from './Apollo'
import NavBar from './NavBar'

class App extends Component {
  get adminRoutes() {
    // TODO: check if the current user is an admin and render these routes
    if (!auth.isAuthenticated) {
      return <></>
    }

    return (
      <>
        <Route
          path="/cohorts"
          render={props => {
            return <CohortPage auth={auth} {...props} />
          }}
        />
      </>
    )
  }

  get userRoutes() {
    return (
      <>
        <Route
          path="/profile"
          render={props => {
            return <Profile auth={auth} {...props} />
          }}
        />
      </>
    )
  }

  render() {
    return (
      <Apollo>
        <Router history={history}>
          <>
            <NavBar auth={auth} />

            <Route path="/" render={props => <Home auth={auth} {...props} />} />
            <Route
              path="/signout"
              render={props => {
                auth.logout()
                return <Callback {...props} />
              }}
            />
            <Route
              path="/callback/:jwt"
              render={props => {
                auth.handleAuthentication(props.match.params.jwt)

                return <Callback {...props} />
              }}
            />
            {this.adminRoutes}
            {this.userRoutes}
          </>
        </Router>
      </Apollo>
    )
  }
}

export default App
