import React, { Component } from 'react'
import QueryContainer from '../containers/QueryContainer'
import Cohorts from './Cohorts'

class CohortPage extends Component {
  listAllCohorts = `{
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
  }`

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Cohorts</h1>
        </div>
        <div className="section">
          <div className="container">
            <QueryContainer query={this.listAllCohorts}>
              <Cohorts />
            </QueryContainer>
          </div>
        </div>
      </section>
    )
  }
}

export default CohortPage
