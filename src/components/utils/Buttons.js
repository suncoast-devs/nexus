import React from 'react'

const DeleteButton = ({ onClick }) => (
  <span className="icon has-text-danger" onClick={onClick}>
    <i className="fas fa-minus-square" />
  </span>
)

const AddButton = ({ onClick }) => (
  <span className="icon has-text-success" onClick={onClick}>
    <i className="fas fa-plus-square" />
  </span>
)

export { AddButton, DeleteButton }
