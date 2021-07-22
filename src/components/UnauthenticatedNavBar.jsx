import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import icon from '/src//images/icon.svg'
import cx from 'classnames'
import history from '/src//history'

export class UnauthenticatedNavBar extends Component {
  state = {
    active: false,
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
            className={cx('navbar-burger', 'burger', {
              'is-active': this.state.active,
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
        </div>
        <div className={cx('navbar-menu', { 'is-active': this.state.active })}>
          <div className="navbar-start" />
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <button className="button is-link" onClick={() => this.props.auth.login()}>
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
}
