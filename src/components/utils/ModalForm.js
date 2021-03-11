import React from 'react'
import cx from 'classnames'

export const ModalForm = ({
  active,
  children,
  title,
  onClose,
  onConfirm,
  onDelete,
  deleteLabel = 'Delete',
  cancelLabel = 'Cancel',
  confirmLabel = 'Submit',
}) => {
  return (
    <div className={cx('modal', { 'is-active': active })}>
      <div className="modal-background" />
      <div className="modal-card">
        <form
          onSubmit={e => {
            e.preventDefault()
            onConfirm()
          }}
        >
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={onClose} />
          </header>
          <section className="modal-card-body">{children}</section>
          <footer className="modal-card-foot is-block">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  {onConfirm && (
                    <button className="button is-success" type="submit">
                      {confirmLabel}
                    </button>
                  )}
                </div>
                <div className="level-item">
                  {onClose && (
                    <button className="button" onClick={onClose} type="button">
                      {cancelLabel}
                    </button>
                  )}
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  {onDelete && (
                    <button className="button is-danger" onClick={onDelete} type="button">
                      {deleteLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </footer>
        </form>
      </div>
    </div>
  )
}
