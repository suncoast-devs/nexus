import React, { useState, useEffect } from 'react'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import auth from '@/Auth'
import { AssignmentEventDetails } from '@/pages/assignments/StudentAssignmentPage'

type Gist = {
  id: string
  description: string
  html_url: string
}

export function GistTurnIn({
  assignmentEventDetails,
  setAssignmentEventDetails,
}: {
  assignmentEventDetails: AssignmentEventDetails
  setAssignmentEventDetails: (assignmentDetails: AssignmentEventDetails) => void
}) {
  const [gists, setGists] = useState<Gist[]>([])

  useEffect(() => {
    async function fetchGists() {
      const response = await fetch(`${import.meta.env.VITE_PYLON_URL}/api/v1/gists`, {
        headers: { Authorization: `Token token="${auth.token}"` },
      })

      const gistsFromApi = await response.json()

      setGists(gistsFromApi)
    }

    fetchGists()
  })

  function onChangeGist(event: React.ChangeEvent<HTMLSelectElement>) {
    const gist = gists.find(gist => parseInt(gist.id) === parseInt(event.target.value))

    if (gist) {
      setAssignmentEventDetails({
        ...assignmentEventDetails,
        payload: {
          ...assignmentEventDetails.payload,
          gist_id: gist.id,
          gist_description: gist.description,
          gist_url: gist.html_url,
        },
      })
    }
  }

  if (gists.length === 0) {
    return <LoadingIndicator />
  }

  return (
    <div className="field">
      <label className="label">Gist</label>
      <div className="select">
        <select value={assignmentEventDetails.payload.gist_id} onChange={onChangeGist}>
          <option>-- Select a gist --</option>
          {gists.map(gist => (
            <option key={gist.id} value={gist.id}>
              {gist.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
