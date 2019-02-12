import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import icon from '../images/icon.svg'
import cx from 'classnames'
import history from '../history'

class AuthenticatedNavBar extends Component {
  state = {
    active: false
  }

  toggle = () => {
    this.setState({ active: !this.state.active })
  }

  componentDidMount() {
    this.unlisten = history.listen(() => {
      this.setState({ active: false })
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  get brandIcon() {
    return (
      <Link to="/" className="navbar-item">
        <img
          src={icon}
          alt="Suncoast Developers Guild"
          height="28"
          width="28"
        />
      </Link>
    )
  }

  get burger() {
    return (
      <div
        className={cx('navbar-burger', 'burger', {
          'is-active': this.state.active
        })}
        aria-label="menu"
        aria-expanded={this.state.active}
        role="button"
        onClick={this.toggle}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </div>
    )
  }

  get assignments() {
    return (
      <NavLink
        className="navbar-item"
        activeClassName="is-active"
        to="/assignments"
      >
        Assignments
      </NavLink>
    )
  }

  get admin() {
    const { me } = this.props

    if (me && !me.isAdmin) {
      return <></>
    }

    return (
      <>
        <div className="navbar-link">Admin</div>
        <div className="navbar-dropdown is-boxed">
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/attendance"
          >
            Attendance
          </NavLink>
          <hr className="navbar-divider" />
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/cohorts"
          >
            Cohorts
          </NavLink>
          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/invitations"
          >
            Invitations
          </NavLink>
        </div>
      </>
    )
  }

  get profile() {
    const { me } = this.props

    return (
      <>
        <div className="media">
          <div className="media-left">
            <figure className="image is-32x32">
              <img
                className="is-rounded"
                alt="profile"
                src={me && me.smallProfileImageUrl}
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="is-6">{me && me.fullName}</p>
          </div>
        </div>
      </>
    )
  }

  get profileMenu() {
    return (
      <>
        <NavLink
          className="navbar-item"
          activeClassName="is-active"
          to="/profile"
        >
          Profile
        </NavLink>
        <Link to="/signout" className="navbar-item">
          Sign Out
        </Link>
        <hr className="navbar-divider" />
        <a
          className="navbar-item"
          href="https://github.com/suncoast-devs/nexus/issues"
        >
          Report Issue
        </a>
      </>
    )
  }

  render() {
    return (
      <nav
        className="navbar has-shadow is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          {this.brandIcon}
          {this.burger}
        </div>
        <div className={cx('navbar-menu', { 'is-active': this.state.active })}>
          <div className="navbar-start">
            {this.assignments}
            <div className="navbar-item has-dropdown is-hoverable">
              {this.admin}
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">{this.profile}</div>
              <div className="navbar-dropdown is-right">{this.profileMenu}</div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default AuthenticatedNavBar
