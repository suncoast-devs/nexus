import React, { useContext } from 'react'
import auth from '@/Auth'
import { AuthenticatedNavBar } from './AuthenticatedNavBar'
import { UnauthenticatedNavBar } from './UnauthenticatedNavBar'

import { ErrorsContext, removeError } from './Errors'

import { AdminRoutes, UserRoutes, PublicRoutes, ProfileRoutes } from './Routes'
import useProfile from '@/hooks/useProfile'

function ErrorMessages() {
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

function UserOrAdminRoutes() {
  const { isLoading, profile } = useProfile()

  if (isLoading) {
    return <></>
  }

  return profile.isAdmin ? <AdminRoutes /> : <UserRoutes />
}

export function Layout() {
  return (
    <>
      {auth.isAuthenticated ? <AuthenticatedNavBar /> : <UnauthenticatedNavBar />}
      <ErrorMessages />
      <PublicRoutes />
      <UserOrAdminRoutes />
      <ProfileRoutes />
    </>
  )
}
