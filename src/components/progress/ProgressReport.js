import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'

import { Assignment } from '../models'
import logo from '../../images/logo.png'

const ProgressReport = ({ fromDate, toDate, person, assignments }) => {
  const report = useRef(null)

  const [image, setImage] = useState({})
  const [step, setStep] = useState('editing')
  const [doingWell, setDoingWell] = useState()
  const [improve, setImprove] = useState()
  const [attendanceIssues, setAttendanceIssues] = useState()

  const showInput = () => {
    return step === 'editing'
  }

  const submitReport = () => {
    console.debug({ doingWell, improve, attendanceIssues, image })
  }

  const generateReportImage = () => {
    html2canvas(report.current).then(canvas => {
      canvas.toBlob(blob => {
        const dataURL = canvas.toDataURL('image/png')
        setImage({ dataURL, blob })
        setStep('preview')
      })
    })
  }

  const Button = () => {
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
          </div>
        )
      case 'done-editing':
        return (
          <div className="buttons">
            <button
              className="button is-primary"
              onClick={() => {
                setStep('editing')
              }}
            >
              Edit
            </button>
            <button
              className="button is-primary"
              onClick={() => {
                generateReportImage()
              }}
            >
              Preview
            </button>
          </div>
        )
      case 'preview':
        return (
          <div className="buttons">
            <button
              className="button is-primary"
              onClick={() => {
                setStep('editing')
              }}
            >
              Edit
            </button>
            <button className="button is-primary" onClick={submitReport}>
              Submit
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

  if (step === 'preview') {
    return (
      <section className="section">
        <div className="container">
          <Button />
          <img
            alt="preview"
            src={image.dataURL}
            style={{ border: '2px solid lightgrey', opacity: '0.5', padding: '2rem' }}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <Button />

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
                  <label className="label">What is {person.givenName} doing well?</label>
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
                  <label className="label">Where can {person.givenName} improve?</label>
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
                  <label className="label">Attendance</label>
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
                    <AssignmentCard key={assignment.id} assignment={assignment} />
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

/* <ProgressReport fromDate={'2019-05-01'} toDate={'2019-07-14'} person={profile} assignments={assignments} /> */

export default ProgressReport
