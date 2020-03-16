import React, { useContext } from 'react'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'

import { ErrorsContext, removeError } from './Errors'

import { AdminRoutes, UserRoutes, PublicRoutes, ProfileRoutes } from './Routes'

const ErrorMessages = () => {
  const [errors, setErrors] = useContext(ErrorsContext)

  if (errors.length === 0) {
    return <></>
  }

  return (
    <section className="section" style={{ padding: '1.5rem 1.5rem 0.25rem 1.5rem' }}>
      <div className="container">
        {errors.map(error => (
          <div key={error} className="notification is-danger">
            <button className="delete" onClick={() => removeError(errors, setErrors, error)} />
            {error}
          </div>
        ))}
      </div>
    </section>
  )
}

const UserOrAdminRoutes = ({ profile, forceUpdateProfile, auth }) => {
  if (profile.loading) {
    return <></>
  }

  return profile.isAdmin ? (
    <AdminRoutes {...{ profile, forceUpdateProfile, auth }} />
  ) : (
    <UserRoutes {...{ profile, forceUpdateProfile, auth }} />
  )
}

const Layout = ({ profile, forceUpdateProfile, auth }) => {
  return (
    <>
      {auth.isAuthenticated ? (
        <AuthenticatedNavBar profile={profile} auth={auth} />
      ) : (
        <UnauthenticatedNavBar auth={auth} />
      )}

      <ErrorMessages />

      <PublicRoutes profile={profile} auth={auth} />
      <UserOrAdminRoutes {...{ profile, forceUpdateProfile, auth }} />
      <ProfileRoutes profile={profile} auth={auth} forceUpdateProfile={forceUpdateProfile} />
    </>
  )
}

export default Layout
