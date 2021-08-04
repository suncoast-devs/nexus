import React, { useRef, useEffect, useState } from 'react'
import html2canvas from 'html2canvas'

import { Editing } from './Editing'
import { EditorButtons } from './EditorButtons'
import { Assignment, Person } from '../models'
import { Content } from '../models/StudentProgressReport'

export function GenerateStudentProgressReport({
  content,
  reportImageUrl,
  fromDate,
  toDate,
  assignments,
  person,
  onCreate,
  onSkip,
}: {
  content: Content
  reportImageUrl: string
  fromDate: string
  toDate: string
  assignments: Assignment[]
  person: Person
  onCreate: (state: Content) => void
  onSkip: () => void
}) {
  const shortName = person.givenName || person.fullName
  const initialStep = reportImageUrl ? 'complete' : 'editing'

  const [state, setState] = useState<Content>({
    ...content,
    step: initialStep,
  })

  const report = useRef(null)

  useEffect(() => {
    setState(state => {
      return { ...state, doingWell: content.doingWell || '' }
    })
    setState(state => {
      return { ...state, improve: content.improve || '' }
    })
    setState(state => {
      return { ...state, attendanceIssues: content.attendanceIssues || '' }
    })
  }, [person.id, content.doingWell, content.improve, content.attendanceIssues, initialStep])

  function generateReportImage() {
    html2canvas((report.current as unknown) as HTMLElement).then(canvas => {
      canvas.toBlob(blob => {
        const dataURL = canvas.toDataURL('image/png')
        const image = { dataURL, blob }

        const newState = { ...state, image }

        setState(newState)
        onCreate(newState)
      })
    })
  }

  if (state.step === 'complete') {
    return (
      <>
        <div className="buttons">
          <button className="button is-primary" onClick={() => setState({ ...state, step: 'editing' })}>
            Edit
          </button>
          <button className="button is-primary" onClick={onSkip}>
            Next
          </button>
        </div>
        {reportImageUrl && (
          <img
            alt="preview"
            src={reportImageUrl}
            style={{ border: '2px solid lightgrey', opacity: '0.5', padding: '2rem' }}
          />
        )}
      </>
    )
  }

  return (
    <>
      <EditorButtons key={person.id} onDone={generateReportImage} onSkip={onSkip} />

      <Editing
        showInput={true}
        shortName={shortName}
        fullName={person.fullName}
        assignments={assignments}
        state={state}
        setState={setState}
        title={`${fromDate} to ${toDate}`}
      />

      {/* Make a copy of the report but way off screen. This is the version we convert to canvas and then to an image */}
      <div style={{ marginTop: '-50000px' }} ref={report}>
        <Editing
          showInput={false}
          shortName={shortName}
          fullName={person.fullName}
          assignments={assignments}
          state={state}
          setState={setState}
          title={`${fromDate} to ${toDate}`}
        />
      </div>
    </>
  )
}
