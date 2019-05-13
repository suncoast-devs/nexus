import React from 'react'
import SlackInviteMessage from './SlackInviteMessage'
import GithubSetupMessage from './GithubSetupMessage'

const Home = ({ profile, isAuthenticated }) => {
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
