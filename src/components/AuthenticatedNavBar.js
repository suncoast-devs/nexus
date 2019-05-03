import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import icon from '../images/icon.svg'
import cx from 'classnames'

const admin = () => (
  <>
    <div className="navbar-link">Admin</div>
    <div className="navbar-dropdown is-boxed">
      <NavLink className="navbar-item" activeClassName="is-active" to="/cohorts">
        Cohorts
      </NavLink>
      <NavLink className="navbar-item" activeClassName="is-active" to="/invitations">
        Invitations
      </NavLink>
    </div>
  </>
)

const renderProfile = profile => (
  <>
    <div className="media">
      <div className="media-left">
        <figure className="image is-32x32">
          <img className="is-rounded" alt="0" src={profile.smallProfileImageUrl} />
        </figure>
      </div>
      <div className="media-content">
        <p className="is-6">{profile.fullName}</p>
      </div>
    </div>
  </>
)

const AuthenticatedNavBar = props => {
  const [active, setActive] = useState(false)
  const { profile } = props

  const burger = (
    <div
      className={cx('navbar-burger', 'burger', {
        'is-active': active
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
  )

  const profileMenu = (
    <>
      <NavLink className="navbar-item" activeClassName="is-active" to="/profile">
        Profile
      </NavLink>
      <Link to="/signout" className="navbar-item">
        Sign Out
      </Link>
      <hr className="navbar-divider" />
      <a className="navbar-item" href="https://github.com/suncoast-devs/nexus/issues">
        Report Issue
      </a>
    </>
  )

  return (
    <nav className="navbar has-shadow is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={icon} alt="Suncoast Developers Guild" height="28" width="28" />
        </Link>
        {burger}
      </div>
      <div className={cx('navbar-menu', { 'is-active': active })}>
        <div className="navbar-start">
          <NavLink className="navbar-item" activeClassName="is-active" to="/assignments">
            Assignments
          </NavLink>
          <div className="navbar-item has-dropdown is-hoverable">{profile.isAdmin && admin()}</div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">{renderProfile(profile)}</div>
            <div className="navbar-dropdown is-right">{profileMenu}</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AuthenticatedNavBar
