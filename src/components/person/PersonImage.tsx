import React, { useState } from 'react'

const iconStyle: {
  width: string
  height: string
  textAlign: 'center'
  verticalAlign: string
  lineHeight: string
} = {
  width: '32px',
  height: '32px',
  textAlign: 'center',
  verticalAlign: 'center',
  lineHeight: '32px',
}

export function PersonImage({ alt, url, imgClassName }: { alt: string; url: string; imgClassName?: string }) {
  const [loaded, setLoaded] = useState(false)

  const style = loaded ? { ...iconStyle, display: 'none' } : iconStyle

  return (
    <>
      <i style={style} className="fas fa-user" />
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
