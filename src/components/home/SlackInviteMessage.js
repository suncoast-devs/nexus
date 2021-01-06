import React from 'react'

const SlackInviteMessage = ({ profile }) =>
  profile.slackInviteCode ? (
    <section className="section">
      <div className="container">
        <article className="message is-warning is-medium">
          <div className="message-header content">
            <p>
              You have not connected your Nexus account to Slack. By connecting your Slack account you will receive
              important notices when
              <ul>
                <li>Homework is assigned</li>
                <li>Homework is graded</li>
                <li>When you receive a progress report.</li>
              </ul>
            </p>
          </div>
          <div className="message-body content">
            <p>To connect:</p>
            <ul>
              <li>Open Slack.</li>
              <li>
                Enter <code>nexus</code> in the search bar at the top of the Slack window
              </li>
              <li>
                Select the <code>Nexus (app)</code> option to begin a <em>direct message</em> and type the following as
                your message:
              </li>
              <li>register {profile.slackInviteCode}</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  ) : (
    <></>
  )

export default SlackInviteMessage
