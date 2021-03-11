import React, { useState } from 'react'
import useModelData from '@/hooks/useModelData'
import { Person } from '@/components/models'
import { PersonComponent } from '@/components/person/PersonComponent'
import { LoadingIndicator } from '@/components/utils/LoadingIndicator'
import { LeftRight } from '@/components/utils/LeftRight'
import { NewPersonModal } from '../../components/person/NewPersonModal'
import { PersonButtons } from './PersonButtons'

export function PeoplePage() {
  const [showNewPerson, setShowNewPerson] = useState(false)
  const [search, setSearch] = useState('')
  const { loading, reload: reloadPeople, data: people } = useModelData(() =>
    Person.selectExtra(['token']).per(999).order('full_name').all()
  )

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <LoadingIndicator />
        </div>
      </section>
    )
  }

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
