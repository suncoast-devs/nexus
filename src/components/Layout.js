import React from 'react'
import AuthenticatedNavBar from './AuthenticatedNavBar'
import UnauthenticatedNavBar from './UnauthenticatedNavBar'

import { AdminRoutes, UserRoutes, PublicRoutes, ProfileRoutes } from './Routes'

const Layout = ({ profile, forceUpdateProfile, auth }) => (
  <>
    {auth.isAuthenticated ? (
      <AuthenticatedNavBar profile={profile} auth={auth} />
    ) : (
      <UnauthenticatedNavBar auth={auth} />
    )}
    <PublicRoutes profile={profile} auth={auth} />
    {profile.isAdmin ? (
      <AdminRoutes profile={profile} auth={auth} />
    ) : (
      <UserRoutes forceUpdateProfile={forceUpdateProfile} profile={profile} auth={auth} />
    )}
    <ProfileRoutes />
  </>
)

export default Layout
