import React from 'react'

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <span className="icon has-text-danger" onClick={onClick}>
      <i className="fas fa-minus-square" />
    </span>
  )
}
