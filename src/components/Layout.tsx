import React from 'react'
import auth from '@/Auth'
import { AuthenticatedNavBar } from './AuthenticatedNavBar'
import { UnauthenticatedNavBar } from './UnauthenticatedNavBar'

import { AdminRoutes, UserRoutes, PublicRoutes, ProfileRoutes, CommonRoutes } from './Routes'
import useProfile from '@/hooks/useProfile'

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
      <PublicRoutes />
      <UserOrAdminRoutes />
      <ProfileRoutes />
      <CommonRoutes />
    </>
  )
}
