import React, { Component } from 'react'
import Profile from './Profile'
import axios from 'axios'

class Home extends Component {
  login() {
    this.props.auth.login()
  }

  get isAuthenticated() {
    return this.props.auth.isAuthenticated
  }

  componentWillMount = () => {
    if (!this.isAuthenticated) {
      return
    }

    console.log('graphql')
    axios
      .post('http://localhost:3000', {
        query: `
        {
          cohorts {
            name
            description
            people {
              givenName
              familyName
            }
          }
        }
      `
      })
      .then(response => {
        console.log(response.data)
      })
  }

  render() {
    return (
      <>
        {this.isAuthenticated() && (
          <h4>
            <Profile auth={this.props.auth} />
          </h4>
        )}
        {!this.isAuthenticated() && (
          <div>
            <h4>
              You are not logged in! Please{' '}
              <button onClick={this.login.bind(this)}>Log In</button> to
              continue.
            </h4>
          </div>
        )}
      </>
    )
  }
}

export default Home
