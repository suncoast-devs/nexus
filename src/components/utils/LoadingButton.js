import React, { useState } from 'react'
import cx from 'classnames'

const LoadingButton = props => {
  const [isClicked, setIsClicked] = useState(false)

  const stopLoading = () => setIsClicked(false)

  return (
    <button
      {...props}
      className={cx('button', props.className, { 'is-loading': isClicked })}
      onClick={event => {
        setIsClicked(true)
        props.onClick(stopLoading, event)
      }}
    >
      {props.children}
    </button>
  )
}

export default LoadingButton
