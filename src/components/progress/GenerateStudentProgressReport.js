import React, { useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas'

import { Assignment } from '../models'
import logo from '../../images/logo.png'
import LoadingButton from '../utils/LoadingButton'

const GenerateStudentProgressReport = ({
  content,
  initialStep,
  completed,
  reportImageUrl,
  fromDate,
  toDate,
  person,
  assignments,
  onCreate,
  onSkip
}) => {
  const report = useRef(null)

  const [image, setImage] = useState({})
  const [step, setStep] = useState(initialStep)
  const [doingWell, setDoingWell] = useState(content.doingWell)
  const [improve, setImprove] = useState(content.improve)
  const [attendanceIssues, setAttendanceIssues] = useState(content.attendanceIssues)

  useEffect(() => {
    setDoingWell(content.doingWell)
    setImprove(content.improve)
    setAttendanceIssues(content.attendanceIssues)
  }, [content])

  const shortName = person.givenName || person.fullName

  const showInput = () => {
    return step === 'editing'
  }

  const submitReport = () => {
    onCreate({ doingWell, improve, attendanceIssues, image })
  }

  const generateReportImage = stopLoading => {
    html2canvas(report.current).then(canvas => {
      canvas.toBlob(blob => {
        const dataURL = canvas.toDataURL('image/png')
        stopLoading()
        setImage({ dataURL, blob })
        setStep('preview')
      })
    })
  }

  const Buttons = () => {
    if (completed) {
      return <></>
    }

    switch (step) {
      case 'editing':
        return (
          <div className="buttons">
            <button
              className="button is-primary"
              onClick={() => {
                setStep('done-editing')
              }}
            >
              Done
            </button>
            <button className="button is-warning" onClick={onSkip}>
              Skip
            </button>
          </div>
        )
      case 'done-editing':
        return (
          <div className="buttons">
            <button className="button is-primary" onClick={() => setStep('editing')}>
              Edit
            </button>
            <LoadingButton className="is-primary" onClick={stopLoading => generateReportImage(stopLoading)}>
              Preview
            </LoadingButton>
            <button className="button is-warning" onClick={onSkip}>
              Skip
            </button>
          </div>
        )
      case 'preview':
        return (
          <div className="buttons">
            <button className="button is-primary" onClick={() => setStep('editing')}>
              Edit
            </button>
            <button className="button is-primary" onClick={submitReport}>
              Submit
            </button>
            <button className="button is-warning" onClick={onSkip}>
              Skip
            </button>
          </div>
        )
      case 'complete':
        return (
          <div className="buttons">
            <button className="button is-primary" onClick={() => setStep('editing')}>
              Edit
            </button>
            <button className="button is-warning" onClick={onSkip}>
              Next
            </button>
          </div>
        )
      default:
        return <></>
    }
  }

  const AssignmentCard = ({ assignment }) => {
    const scoreInfo = Assignment.scoreInfo(assignment.score)
    return (
      <div key={assignment.id} className="column is-one-quarter">
        <div
          className="card"
          style={{
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: scoreInfo.style.buttonColor
          }}
        >
          <div className="card-content is-size-3 title">
            <div className="content">{assignment.homework.title}</div>
          </div>
          <footer className="card-footer">
            <span
              className="card-footer-item"
              style={{
                color: scoreInfo.style.textColor,
                backgroundColor: scoreInfo.style.buttonColor
              }}
            >
              {scoreInfo.title}
            </span>
          </footer>
        </div>
      </div>
    )
  }

  const Complete = () => (
    <>
      <Buttons />
      {reportImageUrl && (
        <img
          alt="preview"
          src={reportImageUrl}
          style={{ border: '2px solid lightgrey', opacity: '0.5', padding: '2rem' }}
        />
      )}
    </>
  )

  const Preview = () => (
    <>
      <Buttons />
      <img
        alt="preview"
        src={image.dataURL}
        style={{ border: '2px solid lightgrey', opacity: '0.5', padding: '2rem' }}
      />
    </>
  )

  const Editing = () => (
    <>
      <Buttons />

      <div ref={report}>
        <article className="media">
          <figure className="media-left">
            <p className="image is-128x128">
              <img alt="logo" src={logo} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <h1 className="title">Progress Report for {person.fullName}</h1>
              <h2 className="title">
                {fromDate} to {toDate}
              </h2>
            </div>
          </div>
        </article>
        <section className="section">
          <div className="container">
            <form>
              <div className="field">
                <label className="label">What is {shortName} doing well?</label>
                <div className="control">
                  {showInput() ? (
                    <textarea
                      value={doingWell}
                      onChange={event => setDoingWell(event.target.value)}
                      className="input"
                      placeholder={'Great CSS, good job creating re-usable code, etc...'}
                    />
                  ) : (
                    <h6 className="title is-6">{doingWell}</h6>
                  )}
                </div>
              </div>

              <div className="field">
                <label className="label">Where can {shortName} improve?</label>
                <div className="control">
                  {showInput() ? (
                    <textarea
                      value={improve}
                      onChange={event => setImprove(event.target.value)}
                      className="input"
                      placeholder="Work on problem solving, repeat old homeworks, etc...."
                    />
                  ) : (
                    <h6 className="title is-6">{improve}</h6>
                  )}
                </div>
              </div>

              <div className="field">
                <label className="label">Attendance issues for {shortName}</label>
                <div className="control">
                  {showInput() ? (
                    <textarea
                      value={attendanceIssues}
                      onChange={event => setAttendanceIssues(event.target.value)}
                      className="input"
                      placeholder="No Attendance Issues"
                    />
                  ) : (
                    <h6 className="title is-6">{attendanceIssues}</h6>
                  )}
                </div>
              </div>
            </form>

            <section className="section">
              <div className="columns is-multiline">
                {assignments.map(assignment => (
                  <AssignmentCard key={assignment.homework.id} assignment={assignment} />
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  )

  switch (step) {
    case 'complete':
      return <Complete />
    case 'preview':
      return <Preview />
    default:
      return <Editing />
  }
}

export default GenerateStudentProgressReport
