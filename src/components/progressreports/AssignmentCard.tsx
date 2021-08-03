import React from 'react'
import { Assignment } from '@/components/models'

export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const scoreInfo = Assignment.scoreInfo(assignment.score)

  return (
    <div
      key={assignment.id}
      className="list-item"
      style={{
        color: scoreInfo.style.progressReportTextColor || scoreInfo.style.textColor,
        backgroundColor: scoreInfo.style.progressReportBackgroundColor || scoreInfo.style.buttonColor,
      }}
    >
      <div className="level is-size-5">
        <div className="level-left">
          <span className="level-item">{assignment.homework.title}</span>
        </div>
        <div className="level-right">
          <span className="level-item">{scoreInfo.progressReportTitle || scoreInfo.title}</span>
        </div>
      </div>
    </div>
  )
}
