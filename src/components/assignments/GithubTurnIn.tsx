import React, { useState, useEffect } from 'react'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import auth from '@/Auth'
import moment from 'moment'
import { AssignmentEventDetails } from '@/pages/assignments/StudentAssignmentPage'

export type Repository = {
  id: number
  pushed_at: string
  name: string
  html_url: string
  default_branch: string
  homepage: string
}

export function GithubTurnIn({
  assignmentEventDetails,
  setAssignmentEventDetails,
  setTurnInValid,
}: {
  assignmentEventDetails: AssignmentEventDetails
  setAssignmentEventDetails: (e: AssignmentEventDetails) => void
  setTurnInValid: (turnInValid: boolean) => void
}) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedRepoId, setSelectedRepoId] = useState(0)
  const [repoPushedAt, setRepoPushedAt] = useState<number>(0)

  useEffect(() => {
    setTurnInValid(selectedRepoId !== 0)
  }, [selectedRepoId, setTurnInValid])

  function onChangeRepo(event: React.ChangeEvent<HTMLSelectElement>) {
    const repo = repositories.find(repo => Number(repo.id) === Number(event.target.value))

    if (repo) {
      console.log(repo)

      setSelectedRepoId(repo.id)
      setRepoPushedAt(Date.parse(repo.pushed_at))
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
    } else {
      setSelectedRepoId(0)
    }
  }

  function onChangeBranch(event: React.ChangeEvent<HTMLInputElement>) {
    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: { ...assignmentEventDetails.payload, branch: event.target.value },
    })
  }

  function onChangeHomepage(event: React.ChangeEvent<HTMLInputElement>) {
    setAssignmentEventDetails({
      ...assignmentEventDetails,
      payload: { ...assignmentEventDetails.payload, homepage: event.target.value },
    })
  }

  useEffect(() => {
    async function fetchRepos() {
      const response = await fetch(`${import.meta.env.VITE_PYLON_URL}/api/v1/repositories`, {
        headers: { Authorization: `Token token="${auth.token}"` },
      })

      if (response.ok) {
        const reposFromApi = await response.json()

        setRepositories(reposFromApi)
      }
    }

    fetchRepos()
  }, [])

  if (repositories.length === 0) {
    return (
      <div>
        <LoadingIndicator message="Loading GitHub Repositories" />
      </div>
    )
  }

  let pushAgeMinutes = (Date.now() - repoPushedAt) / 1000 / 60 || 0

  return (
    <>
      <div className="field">
        <label className="label">Github Repository</label>
        <div className="select">
          <select value={assignmentEventDetails.payload.repo_id} onChange={onChangeRepo}>
            <option value={0}>-- Select a repository --</option>
            {repositories.map(repo => (
              <option key={repo.id} value={repo.id}>
                {repo.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedRepoId !== 0 && (
        <>
          {pushAgeMinutes > 60 && (
            <article className="message is-warning">
              <div className="message-header">
                <p>Missing something?</p>
              </div>
              <div className="message-body">
                The last github push to this repository was <strong>{moment(repoPushedAt).fromNow()}</strong>. Are you
                sure you pushed all your code?
              </div>
            </article>
          )}

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
      )}
    </>
  )
}
