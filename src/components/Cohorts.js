import React, { Component } from 'react'

class Cohorts extends Component {
  render() {
    const { loading, cohorts } = this.props

    if (loading) {
      return <></>
    }

    return (
      <table className="table is-bordered is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>People</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.map(cohort => (
            <tr key={cohort.id}>
              <td>{cohort.name}</td>
              <td>
                {cohort.people.map((person, index) => (
                  <p key={index}>{person.fullName}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Cohorts
