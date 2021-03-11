import React, { useRef, useEffect, useReducer } from 'react'
import html2canvas from 'html2canvas'

import { Editing } from './Editing'
import { EditorButtons } from './EditorButtons'

export function GenerateStudentProgressReport({
  content,
  reportImageUrl,
  fromDate,
  toDate,
  assignments,
  person,
  onCreate,
  onSkip,
}) {
  const shortName = person.givenName || person.fullName
  const initialStep = reportImageUrl ? 'complete' : 'editing'

  const [state, dispatch] = useReducer((state, action) => ({ ...state, [action.type]: action.value }), {
    step: initialStep,
    ...content,
  })

  const report = useRef(null)

  useEffect(() => {
    dispatch({ type: 'doingWell', value: content.doingWell || '' })
    dispatch({ type: 'improve', value: content.improve || '' })
    dispatch({ type: 'attendanceIssues', value: content.attendanceIssues || '' })
  }, [person.id, content.doingWell, content.improve, content.attendanceIssues, initialStep])

  const generateReportImage = () => {
    html2canvas(report.current).then(canvas => {
      canvas.toBlob(blob => {
        const dataURL = canvas.toDataURL('image/png')
        const image = { dataURL, blob }

        dispatch({ type: 'image', value: image })
        onCreate({ ...state, image })
      })
    })
  }

  if (state.step === 'complete') {
    return (
      <>
        <div className="buttons">
          <button className="button is-link" onClick={() => dispatch({ type: 'step', value: 'editing' })}>
            Edit
          </button>
          <button className="button is-link" onClick={onSkip}>
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
      <EditorButtons
        key={person.id}
        state={state}
        dispatch={dispatch}
        onDone={generateReportImage}
        onSkip={onSkip}
        report={report}
      />

      <Editing
        showInput={true}
        shortName={shortName}
        fullName={person.fullName}
        assignments={assignments}
        state={state}
        dispatch={dispatch}
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
          dispatch={dispatch}
          title={`${fromDate} to ${toDate}`}
        />
      </div>
    </>
  )
}
