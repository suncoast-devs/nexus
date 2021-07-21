import React from 'react'

const statuses = [
  { key: ' ', text: 'None', className: 'has-background-white-ter', icon: <> </> },
  { key: 'P', text: 'Present', className: 'has-background-success', icon: <i className="fas fa-check" /> },
  { key: 'L', text: 'Late', className: 'has-background-danger', icon: <i className="far fa-clock" /> },
  {
    key: 'E',
    text: 'Excused Absence',
    className: 'has-background-warning',
    icon: <i className="fas fa-ban" />,
  },
  {
    key: 'U',
    text: 'Unexcused Absence',
    className: 'has-background-danger',
    icon: <i className="fas fa-ban" />,
  },
  {
    key: 'D',
    text: 'Dropped',
    className: 'has-background-grey-dark',
    icon: <i className="fas fa-sign-out-alt" />,
  },
  { key: 'X', text: 'Excused Late', className: 'has-background-warning', icon: <i className="far fa-clock" /> },
]

export default statuses
