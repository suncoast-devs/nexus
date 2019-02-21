import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <>
        {!this.props.auth.isAuthenticated && (
          <div>
            <h4>You are not logged in!</h4>
          </div>
        )}
      </>
    )
  }
}

export default Home
