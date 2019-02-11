import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'

import auth from '../Auth'
import history from '../history'
import Callback from './Callback'
import Home from './Home'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import CohortPage from './CohortPage'
import Apollo from './Apollo'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'
import QueryContainer from '../containers/QueryContainer'

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

  get navbar() {
    console.log(`navbar`, auth.isAuthenticated)
    if (auth.isAuthenticated) {
      const query = `
        {
          me {
            fullName
            smallProfileImageUrl
          }
        }
      `

      return (
        <QueryContainer query={query}>
          <AuthenticatedNavBar auth={auth} />
        </QueryContainer>
      )
    } else {
      return <UnauthenticatedNavBar auth={auth} />
    }
  }

  render() {
    return (
      <Apollo>
        <Router history={history}>
          <>
            {this.navbar}

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
