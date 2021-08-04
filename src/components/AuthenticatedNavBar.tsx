import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import icon from '@/images/icon.svg'
import cx from 'classnames'
import { PersonImage } from '@/components/person/PersonImage'
import useProfile from '@/hooks/useProfile'

function Admin() {
  return (
    <>
      <NavLink className="navbar-item" activeClassName="is-active" to="/gradequeue">
        Grade Queue
      </NavLink>
      <NavLink className="navbar-item" activeClassName="is-active" to="/cohorts">
        Cohorts
      </NavLink>
      <NavLink className="navbar-item" activeClassName="is-active" to="/people">
        People
      </NavLink>
    </>
  )
}

function ProfileDropDown() {
  const { isLoading, profile } = useProfile()

  return (
    <div className="media">
      <div className="media-left">
        <figure className="image is-32x32">
          {isLoading ? null : (
            <PersonImage alt={profile.fullName} url={profile.smallProfileImageUrl} imgClassName="is-rounded" />
          )}
        </figure>
      </div>
      <div className="media-content">
        <p className="is-6" style={{ lineHeight: '32px' }}>
          {profile.fullName}
        </p>
      </div>
    </div>
  )
}

function Burger({ active }: { active: boolean }) {
  return (
    <div
      className={cx('navbar-burger', 'burger', {
        'is-active': active,
      })}
      aria-label="menu"
      aria-expanded={active}
      role="button"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  )
}

function ProfileMenu() {
  return (
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
}

export function AuthenticatedNavBar() {
  const { isLoading, profile } = useProfile()
  const [active, setActive] = useState(false)

  if (isLoading) {
    return null
  }

  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
      onClick={() => setActive(!active)}
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={icon} alt="Suncoast Developers Guild" height="28" width="28" />
        </Link>
        <Burger active={active} />
      </div>
      <div className={cx('navbar-menu', { 'is-active': active })}>
        <div className="navbar-start">
          {profile.isAdmin ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <Admin />
            </div>
          ) : (
            <>
              <NavLink className="navbar-item" activeClassName="is-active" to="/gradebook">
                {profile.isAdmin ? 'Gradebook' : 'Homework'}
              </NavLink>
              <NavLink className="navbar-item" activeClassName="is-active" to="/lecture_videos">
                Lecture Videos
              </NavLink>
              <NavLink className="navbar-item" activeClassName="is-active" to="/attendance">
                Attendance
              </NavLink>
              <NavLink className="navbar-item" activeClassName="is-active" to="/progress-reports">
                Progress Reports
              </NavLink>
            </>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              <ProfileDropDown />
            </div>
            <div className="navbar-dropdown is-right">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
