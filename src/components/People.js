import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

import useModelData from '@/hooks/useModelData'
import { Person } from '@/components//models'
import PersonComponent from '@/components/Person'
import LoadingIndicator from '@/components/utils/LoadingIndicator'
import { LeftRight } from '@/components/utils/LeftRight'
import { InputField } from '@/components//utils/Fields'
import formToObject from '@/utils/formToObject'

const NewPersonModal = ({ isActive, onSave, onClose }) => {
  const person = new Person()

  const submit = event => {
    const form = event.target
    event.preventDefault()
    const updatedPerson = formToObject(form, person)

    updatedPerson.save().then(success => {
      if (success) {
        onSave()
        onClose()
        form.reset()
      }
    })
  }

  return (
    <form
      onSubmit={event => {
        submit(event)
      }}
    >
      <div className={cx('modal', { 'is-active': isActive })}>
        <div className="modal-background" />
        <div className="modal-card" style={{ minWidth: '60vw' }}>
          <header className="modal-card-head">
            <p className="modal-card-title">New Person</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">
            <h1 className="title">New Person</h1>
            <InputField defaultObject={person} name="fullName" />
            <InputField defaultObject={person} name="givenName" />
            <InputField defaultObject={person} name="familyName" />
          </section>
          <footer className="modal-card-foot">
            <button type="submit" className="button is-success">
              Save
            </button>
            <button className="button" onClick={onClose}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </form>
  )
}

const People = () => {
  const [showNewPerson, setShowNewPerson] = useState(false)
  const [search, setSearch] = useState('')
  const { loading, reload: reloadPeople, data: people } = useModelData(() => Person.selectExtra(['token']).all())

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
        <NewPersonModal
          isActive={showNewPerson}
          onSave={() => reloadPeople()}
          onClose={() => setShowNewPerson(false)}
        />
        <nav className="panel">
          <p className="panel-heading has-background-info has-text-white">
            People
            <button className="button is-small is-primary is-pulled-right" onClick={() => setShowNewPerson(true)}>
              Add Person
            </button>
          </p>
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
