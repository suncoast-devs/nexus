import React from 'react'
import { Person } from '../models'
import { PersonImage } from './PersonImage'

export function PersonComponent({ person }: { person: Person }) {
  return (
    <article className="media">
      <figure className="media-left">
        <PersonImage alt={person.fullName} url={person.smallProfileImageUrl} />
      </figure>
      <div className="media-content">
        <div className="content">{person.fullName}</div>
      </div>
    </article>
  )
}
