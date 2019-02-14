import React, { Component } from 'react'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'

class NavBar extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      return <AuthenticatedNavBar auth={this.props.auth} />
    } else {
      return <UnauthenticatedNavBar auth={this.props.auth} />
    }
  }
}

export default NavBar
