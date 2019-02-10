import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import axios from 'axios'
import auth from '../Auth'
import history from '../history'
import Callback from './Callback'
import Home from './Home'
import NavBar from './NavBar'

class App extends Component {
  constructor(props) {
    super(props)

    axios.defaults.headers.common = {
      Authorization: auth.token
    }
  }

  render() {
    return (
      <Router history={history}>
        <>
          <NavBar />

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

              axios.defaults.headers.common = {
                Authorization: auth.token
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
