import React, { useState } from 'react'
import { Assignment, AssignmentEvent } from '@/components/models'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'

export function GradedAssignment({ assignmentEvent }: { assignmentEvent: AssignmentEvent }) {
  const [showGif, setShowGif] = useState(true)

  return (
    <>
      <div className="notification is-success is-light">
        <div className="level">
          <div className="level-left">
            <div className="level-item">Graded</div>
          </div>
          <div className="level-right">
            <div className="level-item">{Assignment.scoreInfo(assignmentEvent.payload.score).title}</div>
          </div>
        </div>
      </div>
      <div className="content mb-4">
        <MarkDownDiv markdown={assignmentEvent.payload.comment} />
      </div>
      {showGif && (
        <article className="media">
          <div className="media-content">
            <img
              className="mt-3 image"
              alt={assignmentEvent.payload.gif_caption}
              src={assignmentEvent.payload.gif_url}
            />
            <span className="mt-2 tag is-info is-light">{assignmentEvent.payload.gif_caption}</span>
          </div>
          <div className="media-right">
            <button className="delete" onClick={() => setShowGif(false)} />
          </div>
        </article>
      )}
    </>
  )
}
