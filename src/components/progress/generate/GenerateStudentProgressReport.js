import React, { useRef, useEffect, useReducer } from 'react'
import html2canvas from 'html2canvas'

import { Assignment } from '@/components/models'
import logo from '@/images/logo.png'
import LoadingButton from '@/components/utils/LoadingButton'

const EditorButtons = ({ onDone, onSkip }) => {
  return (
    <div className="buttons">
      <LoadingButton className="is-link" onClick={onDone}>
        Done
      </LoadingButton>
      <button className="button is-warning" onClick={onSkip}>
        Skip
      </button>
    </div>
  )
}

const Editing = ({ showInput, shortName, fullName, assignments, state, dispatch, title }) => {
  const prompts = [
    {
      label: `What is ${shortName} doing well?`,
      field: 'doingWell',
      placeholder: 'Great CSS, good job creating re-usable code, etc...',
    },
    {
      label: `Where can ${shortName} improve?`,
      field: 'improve',
      placeholder: 'Work on problem solving, repeat old homeworks, etc...',
    },
    {
      label: `Attendance issues for ${shortName}`,
      field: 'attendanceIssues',
      placeholder: 'No Attendance Issues',
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <article className="media">
          <figure className="media-left">
            <p className="image is-128x128">
              <img alt="logo" src={logo} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <h1 className="title">Progress Report for {fullName}</h1>
              <h2 className="title">{title}</h2>
            </div>
          </div>
        </article>
        <form>
          {prompts.map((prompt, index) => (
            <div key={index} className="field">
              <label className="label">{prompt.label}</label>
              <div className="control">
                {showInput ? (
                  <textarea
                    value={state[prompt.field]}
                    onChange={event => dispatch({ type: prompt.field, value: event.target.value })}
                    className="textarea"
                    rows={4}
                    placeholder={prompt.placeholder}
                  />
                ) : (
                  <h6 className="title is-6">{state[prompt.field]}</h6>
                )}
              </div>
            </div>
          ))}
        </form>

        <section className="section">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              <div className="list">
                <div className="list-item has-text-centered is-size-3">Assignments</div>
                {assignments
                  .sort((a, b) => a.homework.id - b.homework.id)
                  .map(assignment => (
                    <AssignmentCard key={assignment.homework.id} assignment={assignment} />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

const AssignmentCard = ({ assignment }) => {
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

const GenerateStudentProgressReport = ({
  content,
  reportImageUrl,
  fromDate,
  toDate,
  assignments,
  person,
  onCreate,
  onSkip,
}) => {
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

export default GenerateStudentProgressReport
