import React from 'react'
import { Router } from 'react-router-dom'

import history from '@/history'
import { Layout } from '@/components/Layout'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'

export const queryCache = new QueryCache()

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Layout />
      </Router>
    </QueryClientProvider>
  )
}
