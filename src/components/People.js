import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import useModelData from '@/hooks/useModelData'
import { Person } from '@/components//models'
import PersonComponent from '@/components/Person'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import { LeftRight } from '@/components/utils/LeftRight'

const People = () => {
  const [search, setSearch] = useState('')
  const { loading, data: people } = useModelData(() => Person.selectExtra(['token']).all())

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <LoadingIndicator />
        </div>
      </section>
    )
  }

  const PersonButtons = ({ person }) => (
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
      <Link to={`/impersonate/${person.token}`} className="button is-small is-primary">
        Impersonate
      </Link>
    </span>
  )

  const peopleToDisplay = search ? people.filter(person => person.isMatch(search)) : people

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
            <div key={person.id} className="panel-block is-block">
              <LeftRight left={<PersonComponent person={person} />} right={<PersonButtons person={person} />} />
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default People
