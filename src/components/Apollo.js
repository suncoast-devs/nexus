import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloProviderHooks } from "react-apollo-hooks";
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import auth from '../Auth'

const cache = new InMemoryCache()

const link = new HttpLink({
  uri: process.env.REACT_APP_PYLON_URL,
  headers: {
    authorization: `Bearer ${auth.token}`
  }
})

const client = new ApolloClient({ link, cache })

class Apollo extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ApolloProviderHooks client={client}>
          {this.props.children}
        </ApolloProviderHooks>
      </ApolloProvider>
    )
  }
}

export default Apollo
