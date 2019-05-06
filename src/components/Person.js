import React from 'react'
import icon from '../images/icon.svg'

const iconStyle = { width: '32px', height: '32px', textAlign: 'center', verticalAlign: 'center', lineHeight: '32px' }

const Person = ({ person }) => {
  return (
    <article className="media">
      <figure className="media-left">
        {person.smallProfileImageUrl ? (
          <img alt={person.fullName} src={person.smallProfileImageUrl || icon} />
        ) : (
          <i style={iconStyle} className="fas fa-user" />
        )}
      </figure>
      <div className="media-content">
        <div className="content">{person.fullName}</div>
      </div>
    </article>
  )
}

export default Person
