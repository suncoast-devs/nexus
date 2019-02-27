import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

const LIST_COHORTS = gql`
  {
    cohorts {
      id
      name
      description
      people {
        id
        fullName
        givenName
        familyName
      }
    }
  }
`

const Cohorts = props => {
  const {
    loading,
    data: { cohorts }
  } = useQuery(LIST_COHORTS)

  if (loading) {
    return <></>
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">
          Cohorts
          <span className="is-pulled-right">
            <Link className="button is-primary" to="/cohorts/new">
              New
            </Link>
          </span>
        </h1>
      </div>
      <div className="section">
        <div className="container">
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
                  <td>
                    <Link to={`/cohorts/${cohort.id}`}>{cohort.name}</Link>
                  </td>
                  <td>
                    {cohort.people.map((person, index) => (
                      <p key={index}>{person.fullName}</p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Cohorts
