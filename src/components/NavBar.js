import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import icon from '../images/icon.svg'
import cx from 'classnames'
import history from '../history'

class NavBar extends Component {
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

  render() {
    return (
      <nav className="navbar has-shadow is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img src={icon} alt="Suncoast Developers Guild" height="28" width="28" />
          </Link>
          <div
            className={cx('navbar-burger', 'burger', { 'is-active': this.state.active })}
            aria-label="menu"
            aria-expanded={this.state.active}
            role="button"
            onClick={this.toggle}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </div>
        <div className={cx('navbar-menu', { 'is-active': this.state.active })}>
          <div className="navbar-start">
            <NavLink className="navbar-item" activeClassName="is-active" to="/assignments">
              Assignments
            </NavLink>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">Admin</div>
              <div className="navbar-dropdown is-boxed">
                <NavLink className="navbar-item" activeClassName="is-active" to="/attendance">
                  Attendance
                </NavLink>
                <hr className="navbar-divider" />
                <NavLink className="navbar-item" activeClassName="is-active" to="/cohorts">
                  Cohorts
                </NavLink>
                <NavLink className="navbar-item" activeClassName="is-active" to="/invitations">
                  Invitations
                </NavLink>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">John Doe</div>
              <div className="navbar-dropdown is-right">
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
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
