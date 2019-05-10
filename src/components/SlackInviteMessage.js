import React from 'react'

const SlackInviteMessage = ({ profile }) =>
  profile.slackInviteCode ? (
    <section className="section">
      <div className="container">
        <article className="message is-warning is-medium">
          <div className="message-header">
            <p>You have not connected your Nexus account to Slack</p>
          </div>
          <div className="message-body">
            Send the message <code>register {profile.slackInviteCode}</code> to <code>nexus</code> in a direct message
            to start to receive notices from Nexus on Slack.
          </div>
        </article>
      </div>
    </section>
  ) : (
    <></>
  )

export default SlackInviteMessage
