import React from 'react'

const SlackInviteMessage = ({ profile }) =>
  profile.slackInviteCode ? (
    <section className="section">
      <div className="container">
        <article className="message is-warning is-medium">
          <div className="message-header">
            <p>You have not connected your Nexus account to Slack</p>
            <p>
              By connecting your Slack account you will receive important notices when homework is assigned and graded,
              and when you receive a progress report.
            </p>
          </div>
          <div className="message-body">
            <p>To connect:</p>
            <p>
              Enter <code>nexus</code> in the search bar at the top of the Slack window
            </p>
            <p>Select the Nexus (app) option to begin a "direct message" and type the following as your message:</p>
            <p />
            <p>register {profile.slackInviteCode}</p>
          </div>
        </article>
      </div>
    </section>
  ) : (
    <></>
  )

export default SlackInviteMessage
