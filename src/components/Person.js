import React from 'react'

const Person = ({ person }) => {
  return (
    <article className="media">
      <figure className="media-left">
        <img alt={person.fullName} src={person.smallProfileImageUrl} />
      </figure>
      <div className="media-content">
        <div className="content">{person.fullName}</div>
      </div>
    </article>
  )
}

export default Person
