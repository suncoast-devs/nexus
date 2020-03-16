import React, { useState } from 'react'
import { iconStyle } from './Person'

export const PersonImage = ({ alt, url, imgClassName }) => {
  const [error, setError] = useState(!url)
  if (error) {
    return <i style={iconStyle} className="fas fa-user" />
  } else {
    return <img alt={alt} src={url} className={imgClassName} onError={() => setError(true)} />
  }
}
