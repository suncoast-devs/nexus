import React, { useState } from 'react'

const iconStyle = { width: '32px', height: '32px', textAlign: 'center', verticalAlign: 'center', lineHeight: '32px' }

const PersonImage = ({ alt, url }) => {
  const [error, setError] = useState(!url)

  if (error) {
    return <i style={iconStyle} className="fas fa-user" />
  } else {
    return <img alt={alt} src={url} onError={() => setError(true)} />
  }
}
const Person = ({ person }) => {
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

export default Person
