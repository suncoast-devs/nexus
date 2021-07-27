import React from 'react'
import { PersonComponent } from '/src/components/person/PersonComponent'
import { LeftRight } from '/src/components/utils/LeftRight'
import { panelClass } from './panelClass'

export function SelectPeople({ sortedPeople, selectedPeopleIDs, togglePerson }) {
  return (
    <nav className="panel">
      <p className="panel-heading has-background-info has-text-white">People</p>
      {sortedPeople.map(person => {
        const selected = selectedPeopleIDs.includes(person.id)

        return (
          <div key={person.id} className={panelClass(selected)} onClick={() => togglePerson(selected, person)}>
            <LeftRight
              left={<PersonComponent person={person} />}
              right={<span>{selected && <i className="fas fa-check" />}</span>}
            />
          </div>
        )
      })}
    </nav>
  )
}
