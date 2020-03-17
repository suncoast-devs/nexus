import React, { useState } from 'react'

const iconStyle = {
  width: '32px',
  height: '32px',
  textAlign: 'center',
  verticalAlign: 'center',
  lineHeight: '32px',
}

export const PersonImage = ({ alt, url, imgClassName }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <i style={Object.assign({ display: loaded ? 'none' : '' }, iconStyle)} className="fas fa-user" />
      <img
        style={{ display: loaded ? '' : 'none' }}
        alt={alt}
        src={url}
        className={imgClassName}
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}
