import React, { Component } from 'react'

class Home extends Component {
  login = () => {
    this.props.auth.login()
  }

  render() {
    return (
      <>
        {!this.props.auth.isAuthenticated && (
          <div>
            <h4>
              You are not logged in! Please
              <button onClick={this.login}>Log In</button> to continue.
            </h4>
          </div>
        )}
      </>
    )
  }
}

export default Home
