import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

class QueryContainer extends Component {
  render() {
    const { query } = this.props
    const gqlQuery =
      typeof query === 'string'
        ? gql`
            ${query}
          `
        : query

    return (
      <Query query={gqlQuery}>
        {({ data, loading }) => {
          return React.Children.map(this.props.children, (child, index) =>
            React.cloneElement(child, { index, loading, ...data })
          )
        }}
      </Query>
    )
  }
}

export default QueryContainer
