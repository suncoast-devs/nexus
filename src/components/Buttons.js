import React from 'react'

const DeleteButton = ({ onClick }) => (
  <span className="icon">
    <a
      className="has-text-danger"
      onClick={event => {
        event.preventDefault()
        onClick()
      }}
    >
      <i className="fas fa-minus-square" />
    </a>
  </span>
)

const AddButton = ({ onClick }) => (
  <span className="icon">
    <a
      className="has-text-success"
      onClick={event => {
        event.preventDefault()
        onClick()
      }}
    >
      <i className="fas fa-plus-square" />
    </a>
  </span>
)

export { AddButton, DeleteButton }
