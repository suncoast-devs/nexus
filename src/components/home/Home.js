import React from 'react'
import SlackInviteMessage from './SlackInviteMessage'
import GithubSetupMessage from './GithubSetupMessage'

import { Assignment } from '../models'
import useModelData from '../../hooks/useModelData'
import ProgressReport from '../progress/ProgressReport'

const Home = ({ profile, isAuthenticated }) => {
  const { data: assignments } = useModelData(() => Assignment.includes('homework').all())

  return (
    <>
      <SlackInviteMessage profile={profile} />
      <GithubSetupMessage profile={profile} />
      {!isAuthenticated && (
        <div>
          <h4>You are not logged in!</h4>
        </div>
      )}
    </>
  )
}

export default Home
