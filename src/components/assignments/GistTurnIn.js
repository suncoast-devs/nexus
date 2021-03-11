import React, { useState, useEffect } from 'react'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import auth from '@/Auth'

export function GistTurnIn({ assignmentEventDetails, setAssignmentEventDetails }) {
  const [gists, setGists] = useState([])

  useEffect(() => {
    async function fetchGists() {
      const response = await fetch(`${process.env.REACT_APP_PYLON_URL}/api/v1/gists`, {
        headers: { Authorization: `Token token="${auth.token}"` },
      })

      const gistsFromApi = await response.json()

      setGists(gistsFromApi)
    }

    fetchGists()
  })

  const onChangeGist = event => {
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
