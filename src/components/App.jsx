import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'

import auth from '/src/Auth'
import history from '/src/history'
import { Layout } from '/src/components/Layout'
import useProfile from '/src//hooks/useProfile'
import { ErrorsContext } from '/src/components/Errors'

export function App() {
  const { profile, forceUpdateProfile } = useProfile()

  const [errors, setErrors] = useState([])

  // Sets up an effect that watches for page changes and clears the
  // errors collection when it does.
  useEffect(() => {
    const unlisten = history.listen((location, action) => setErrors([]))

    return () => unlisten()
  })

  return (
    <ErrorsContext.Provider value={[errors, setErrors]}>
      <Router history={history}>
        <Layout profile={profile} forceUpdateProfile={forceUpdateProfile} auth={auth} />
      </Router>
    </ErrorsContext.Provider>
  )
}
