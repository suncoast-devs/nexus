import React from 'react'
import { SlackInviteMessage } from '../../components/home/SlackInviteMessage'
import { AdminShowGradeQueuesPage } from '/src//pages/gradebook/AdminShowGradeQueuesPage'
import { StudentGradebookPage } from '/src//pages/gradebook/StudentGradebookPage'
import banner from '/src//images/banner.svg'

export function HomePage({ profile, isAuthenticated }) {
  if (!isAuthenticated) {
    return (
      <div>
        <h4>You are not logged in!</h4>
      </div>
    )
  }

  if (profile.isAdmin) {
    return <AdminShowGradeQueuesPage profile={profile} />
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
      <StudentGradebookPage profile={profile} />}
    </>
  )
}
