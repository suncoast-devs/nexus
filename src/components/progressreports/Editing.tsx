import React from 'react'
import logo from '@/images/logo.png'
import { AssignmentCard } from './AssignmentCard'
import { Assignment } from '../models'
import { Content } from './GenerateStudentProgressReport'

export function Editing({
  showInput,
  shortName,
  fullName,
  assignments,
  state,
  setState,
  title,
}: {
  showInput: boolean
  shortName: string
  fullName: string
  assignments: Assignment[]
  state: Content
  setState: (state: Content) => void
  title: string
}) {
  const prompts: { label: string; field: 'doingWell' | 'improve' | 'attendanceIssues'; placeholder: string }[] = [
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
                    onChange={event => {
                      setState({ ...state, [prompt.field]: event.target.value })
                    }}
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
                <div className="notification is-secondary has-text-centered">
                  Completed{' '}
                  <strong>
                    {
                      assignments.filter(
                        assignment => assignment.homework.countsTowardsCompletion && assignment.completed
                      ).length
                    }
                  </strong>{' '}
                  assignments out of{' '}
                  <strong>
                    {assignments.filter(assignment => assignment.homework.countsTowardsCompletion).length}
                  </strong>
                </div>
                <div className="list-item has-text-centered is-size-3">Assignments</div>
                {assignments
                  .sort((a, b) => Number(a.homework.id) - Number(b.homework.id))
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
