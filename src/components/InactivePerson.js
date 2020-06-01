import React from 'react'
import { PersonImage } from './PersonImage'

const InactivePerson = ({ person }) => {
  return (
    <article className="media has-text-light">
      <figure className="media-left">
        <PersonImage alt={person.fullName} url={person.smallProfileImageUrl} />
      </figure>
      <div className="media-content">
        <div className="content">{person.fullName}</div>
      </div>
    </article>
  )
}

export default InactivePerson
