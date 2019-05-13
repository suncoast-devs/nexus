import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import useModelData from '../hooks/useModelData'
import { Person } from './models'
import PersonComponent from './Person'
import LoadingIndicator from './utils/LoadingIndicator'
import { LeftRight } from './utils/LeftRight'

const People = () => {
  const [search, setSearch] = useState()
  const { loading, data: people } = useModelData(() => Person.all())

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <LoadingIndicator />
        </div>
      </section>
    )
  }

  const peopleToDisplay = search ? people.filter(person => person.fullName.includes(search)) : people

  return (
    <section className="section">
      <div className="container">
        <nav className="panel">
          <p className="panel-heading has-background-info has-text-white">People</p>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input is-small"
                type="text"
                placeholder="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            </p>
          </div>
          {peopleToDisplay.map(person => (
            <div className="panel-block is-block">
              <LeftRight
                left={<PersonComponent person={person} />}
                right={
                  <span className="buttons">
                    <Link to={`/people/${person.id}/gradebook`} className="button is-small is-primary">
                      Gradebook
                    </Link>
                    <Link to={`/people/${person.id}/attendance`} className="button is-small is-primary">
                      Attendance
                    </Link>
                    <Link to={`/people/${person.id}/progress-reports`} className="button is-small is-primary">
                      Progress Reports
                    </Link>
                  </span>
                }
              />
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default People
