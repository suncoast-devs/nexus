import useProfile from '@/hooks/useProfile'
import React from 'react'

export function SlackInviteMessage() {
  const { profile } = useProfile()

  return profile.slackInviteCode ? (
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
                <p>
                  Select the <code>Nexus</code> option that has an avatar image to begin a <em>direct message</em> and
                  type the following as your message:
                </p>
                {/* This is a hack to make sure that the register code when copied is (A) a single element with no unbreakable spaces and (B) is copied without any formatting */}
                <textarea
                  className="textarea is-large"
                  readOnly
                  style={{
                    border: 'none',
                    overflow: 'auto',
                    outline: 'none',
                    MozBoxShadow: 'none',
                    WebkitBoxShadow: 'none',
                    boxShadow: 'none',
                    resize: 'none',
                    backgroundColor: 'transparent',
                  }}
                >
                  {`register ${profile.slackInviteCode}`}
                </textarea>
              </li>
              <li>If you have trouble with the above, try typing the message instead of copy and paste.</li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  ) : (
    <></>
  )
}
