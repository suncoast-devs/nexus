import React from 'react'
import SlackInviteMessage from './SlackInviteMessage'
import GithubSetupMessage from './GithubSetupMessage'
import banner from '../../images/banner.svg'

const Home = ({ profile, isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? (
        <section className="section">
          <div className="container">
            <article className="message is-info is-medium">
              <div className="message-header">
                <p>Welcome to Nexus</p>
              </div>
              <div className="message-body" style={{ textAlign: 'center' }}>
                <p>
                  <img alt="banner" src={banner} style={{ width: '25%' }} />
                </p>
                <p>Welcome to Nexus, your student information management system</p>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <div>
          <h4>You are not logged in!</h4>
        </div>
      )}
      <GithubSetupMessage profile={profile} />
      <SlackInviteMessage profile={profile} />
    </>
  )
}

export default Home
