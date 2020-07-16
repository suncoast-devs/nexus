import React, { useState, useEffect } from 'react'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import auth from '@/Auth'
export const GithubTurnIn = ({ assignmentEventDetails, setAssignmentEventDetails }) => {
  const [repositories, setRepositories] = useState([])

  const onChangeRepo = event => {
    const repo = repositories.find(repo => parseInt(repo.id) === parseInt(event.target.value))

    if (repo) {
      setAssignmentEventDetails({
        ...assignmentEventDetails,
        payload: {
          ...assignmentEventDetails.payload,
          repo_id: repo.id,
          repo_name: repo.name,
          repo_url: repo.html_url,
          branch: repo.default_branch,
          homepage: repo.homepage,
        },
      })
    }
  }

  const onChangeBranch = event => {
    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: { ...assignmentEventDetails.payload, branch: event.target.value },
    })
  }

  const onChangeHomepage = event => {
    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: { ...assignmentEventDetails.payload, homepage: event.target.value },
    })
  }

  useEffect(() => {
    async function fetchRepos() {
      const response = await fetch(`${process.env.REACT_APP_PYLON_URL}/api/v1/repositories`, {
        headers: { Authorization: `Token token="${auth.token}"` },
      })

      const reposFromApi = await response.json()

      setRepositories(reposFromApi)
    }

    fetchRepos()
  }, [])

  if (repositories.length === 0) {
    return <LoadingIndicator />
  }

  return (
    <>
      <div className="field">
        <label className="label">Github Repository</label>
        <div className="select">
          <select value={assignmentEventDetails.payload.repo_id} onChange={onChangeRepo}>
            <option>-- Select a repository --</option>
            {repositories.map(repo => (
              <option key={repo.id} value={repo.id}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label">Github Branch</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={assignmentEventDetails.payload.branch}
            onChange={onChangeBranch}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Deployed Site</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={assignmentEventDetails.payload.homepage}
            onChange={onChangeHomepage}
          />
        </div>
      </div>
    </>
  )
}
