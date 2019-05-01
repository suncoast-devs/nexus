import React from 'react'
import { Router } from 'react-router-dom'

import auth from '../Auth'
import history from '../history'
import Layout from './Layout'
import useProfile from '../hooks/useProfile'

const App = props => {
  const { profile, forceUpdateProfile } = useProfile()

  return (
    <Router history={history}>
      <Layout profile={profile} forceUpdateProfile={forceUpdateProfile} auth={auth} />
    </Router>
  )
}

export default App
