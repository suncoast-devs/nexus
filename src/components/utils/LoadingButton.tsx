import React, { ReactNode, useState } from 'react'
import cx from 'classnames'

export type LoadingButtonOnClick = (stopLoading: () => void, event: React.MouseEvent) => void

export function LoadingButton({
  className,
  onClick,
  children,
}: {
  className: string
  onClick: LoadingButtonOnClick
  children: ReactNode
}) {
  const [isClicked, setIsClicked] = useState(false)

  const stopLoading = () => setIsClicked(false)

  return (
    <button
      className={cx('button', className, { 'is-loading': isClicked })}
      onClick={event => {
        setIsClicked(true)
        onClick(stopLoading, event)
      }}
    >
      {children}
    </button>
  )
}
