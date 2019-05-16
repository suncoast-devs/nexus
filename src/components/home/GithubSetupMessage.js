import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Person } from '@/components/models'

const GithubSetupMessage = ({ profile }) => {
  const { loading, data: person } = useModelData(() => Person.selectExtra(['assignments_repo_exists']).find(profile.id))

  return loading || person.assignmentsRepoExists ? (
    <></>
  ) : (
    <section className="section">
      <div className="container">
        <article className="message is-danger is-medium">
          <div className="message-header">
            <p>We could not find your Github repository for assignments</p>
          </div>
          <div className="message-body">
            Ensure that you have a repository and that it is configured in your profile.
          </div>
        </article>
      </div>
    </section>
  )
}

export default GithubSetupMessage
