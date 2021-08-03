import React from 'react'
import { PersonComponent } from '@/components/person/PersonComponent'
import { LeftRight } from '@/components/utils/LeftRight'
import { panelClass } from './panelClass'
import { Person } from '../models'

export function SelectPeople({
  sortedPeople,
  selectedPeopleIDs,
  togglePerson,
}: {
  sortedPeople: Person[]
  selectedPeopleIDs: string[]
  togglePerson: (selected: boolean, person: Person) => void
}) {
  return (
    <nav className="panel">
      <p className="panel-heading has-background-info has-text-white">People</p>
      {sortedPeople.map(person => {
        const selected = selectedPeopleIDs.includes(person.key())

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
