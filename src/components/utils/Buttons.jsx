import React from 'react'

export function DeleteButton({ onClick }) {
  return (
    <span className="icon has-text-danger" onClick={onClick}>
      <i className="fas fa-minus-square" />
    </span>
  )
}

export function AddButton({ onClick }) {
  return (
    <span className="icon has-text-success" onClick={onClick}>
      <i className="fas fa-plus-square" />
    </span>
  )
}
