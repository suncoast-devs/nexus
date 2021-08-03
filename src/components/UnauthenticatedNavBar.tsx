import React, { useState } from 'react'
import auth from '@/Auth'
import { Link } from 'react-router-dom'
import icon from '@/images/icon.svg'
import cx from 'classnames'

export function UnauthenticatedNavBar() {
  const [active, setActive] = useState(false)

  return (
    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={icon} alt="Suncoast Developers Guild" height="28" width="28" />
        </Link>
        <div
          className={cx('navbar-burger', 'burger', {
            'is-active': active,
          })}
          aria-label="menu"
          aria-expanded={active}
          role="button"
          onClick={() => setActive(!active)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
      </div>
      <div className={cx('navbar-menu', { 'is-active': active })}>
        <div className="navbar-start" />
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary" onClick={() => auth.login()}>
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
