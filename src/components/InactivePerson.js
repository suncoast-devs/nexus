import React from 'react'

const iconStyle = { width: '32px', height: '32px', textAlign: 'center', verticalAlign: 'center', lineHeight: '32px' }

const InactivePerson = ({ person }) => {
  return (
    <article className="media has-text-danger">
      <figure className="media-left">
        <i style={iconStyle} className="fas fa-user" />
      </figure>
      <div className="media-content">
        <div className="content">{person.fullName}</div>
      </div>
    </article>
  )
}

export default InactivePerson
