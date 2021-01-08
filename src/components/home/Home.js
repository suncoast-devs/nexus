import React from 'react'
import SlackInviteMessage from './SlackInviteMessage'
import AdminShowGradeQueues from '@/components/gradebook/AdminShowGradeQueues'
import StudentGradebook from '@/components/gradebook/StudentGradebook'
import banner from '@/images/banner.svg'

const Home = ({ profile, isAuthenticated }) => {
  if (!isAuthenticated) {
    return (
      <div>
        <h4>You are not logged in!</h4>
      </div>
    )
  }

  if (profile.isAdmin) {
    return <AdminShowGradeQueues profile={profile} />
  }

  return (
    <>
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
      <SlackInviteMessage profile={profile} />
      <StudentGradebook profile={profile} />}
    </>
  )
}

export default Home
