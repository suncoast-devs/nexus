import React from 'react'
import cx from 'classnames'

import { Person } from '/src//components/models'
import { InputField } from '/src//components//utils/Fields'
import { formToObject } from '/src//utils/formToObject'

export function NewPersonModal({ isActive, onSave, onClose }) {
  const person = new Person()

  const submit = event => {
    const form = event.target
    event.preventDefault()
    const updatedPerson = formToObject(form, person)

    updatedPerson.save().then(success => {
      if (success) {
        onSave()
        onClose()
        form.reset()
      }
    })
  }

  return (
    <form
      onSubmit={event => {
        submit(event)
      }}
    >
      <div className={cx('modal', { 'is-active': isActive })}>
        <div className="modal-background" />
        <div className="modal-card" style={{ minWidth: '60vw' }}>
          <header className="modal-card-head">
            <p className="modal-card-title">New Person</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">
            <h1 className="title">New Person</h1>
            <InputField defaultObject={person} name="fullName" />
            <InputField defaultObject={person} name="givenName" />
            <InputField defaultObject={person} name="familyName" />
          </section>
          <footer className="modal-card-foot">
            <button type="submit" className="button is-success">
              Save
            </button>
            <button
              className="button"
              onClick={event => {
                event.preventDefault()
                onClose()
              }}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </form>
  )
}
