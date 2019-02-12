import React, { Component } from 'react'
import QueryContainer from '../containers/QueryContainer'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'

class NavBar extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      const query = `
        {
          me {
            id
            isAdmin
            fullName
            smallProfileImageUrl
          }
        }
      `

      return (
        <QueryContainer query={query}>
          <AuthenticatedNavBar auth={this.props.auth} />
        </QueryContainer>
      )
    } else {
      return <UnauthenticatedNavBar auth={this.props.auth} />
    }
  }
}

export default NavBar
