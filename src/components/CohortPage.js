import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const listAllCohorts = gql`
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

const CohortPage = props => {
  const {
    loading,
    data: { cohorts }
  } = useQuery(listAllCohorts)

  if (loading) {
    return <></>
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Cohorts</h1>
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
        </div>
      </div>
    </section>
  )
}

export default CohortPage
