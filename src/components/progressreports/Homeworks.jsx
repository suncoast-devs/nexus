import React from 'react'
import { LeftRight } from '@/components/utils/LeftRight'
import { panelClass } from './panelClass'

export function Homeworks({ sortedHomeworks, selectedHomeworkIDs, toggleHomework }) {
  return (
    <nav className="panel">
      <p className="panel-heading has-background-info has-text-white">Homework</p>
      {sortedHomeworks.map(homework => {
        const selected = selectedHomeworkIDs.includes(homework.id)

        return (
          <div key={homework.id} className={panelClass(selected)} onClick={() => toggleHomework(selected, homework)}>
            <LeftRight left={homework.title} right={<span>{selected && <i className="fas fa-check" />}</span>} />
          </div>
        )
      })}
    </nav>
  )
}
