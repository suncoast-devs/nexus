import React, { Suspense, Component } from 'react'
import { Route } from 'react-router-dom'

import Callback from './Callback'
import Home from './Home'
import CohortPage from './CohortPage'
import Profile from './Profile'
import NavBar from './NavBar'

class Layout extends Component {
  get adminRoutes() {
    // TODO: check if the current user is an admin and render these routes
    if (!this.props.auth.isAuthenticated) {
      return <></>
    }

    return (
      <>
        <Route
          path="/cohorts"
          render={props => {
            return <CohortPage auth={this.props.auth} {...props} />
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
            return <Profile auth={this.props.auth} {...props} />
          }}
        />
      </>
    )
  }

  render() {
    return (
      <>
        <Suspense fallback={null}>
          <NavBar auth={this.props.auth} />
        </Suspense>

        <Route
          path="/"
          exact
          render={props => <Home auth={this.props.auth} {...props} />}
        />
        <Route
          path="/signout"
          render={props => {
            this.props.auth.logout()
            return <Callback {...props} />
          }}
        />
        <Route
          path="/callback/:jwt"
          render={props => {
            this.props.auth.handleAuthentication(props.match.params.jwt)

            return <Callback {...props} />
          }}
        />
        {this.adminRoutes}
        {this.userRoutes}
      </>
    )
  }
}

export default Layout
