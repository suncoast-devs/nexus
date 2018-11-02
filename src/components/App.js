import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'
import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core'
import Auth from '../Auth'
import history from '../history'
import Callback from './Callback'
import Home from './Home'

const auth = new Auth()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <>
          <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
              <NavbarHeading>Nexus</NavbarHeading>
              <NavbarDivider />
              <Button className={Classes.MINIMAL} icon="home" text="Home" />
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
              <Button className={Classes.MINIMAL} icon="document" text="Files" />
            </NavbarGroup>
          </Navbar>
          <h1>Hello, World!</h1>
          <Route path="/" render={props => <Home auth={auth} {...props} />} />
          <Route
            path="/callback"
            render={props => {
              if (/access_token|id_token|error/.test(props.location.hash)) {
                auth.handleAuthentication()
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
