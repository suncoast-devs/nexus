import React, { Component } from 'react'
import Profile from './Profile'

class Home extends Component {
  login() {
    this.props.auth.login()
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <>
        {isAuthenticated() && (
          <h4>
            <Profile auth={this.props.auth} />
          </h4>
        )}
        {!isAuthenticated() && (
          <div>
            <h4>
              You are not logged in! Please <button onClick={this.login.bind(this)}>Log In</button> to continue.
            </h4>
          </div>
        )}
      </>
    )
  }
}

export default Home
