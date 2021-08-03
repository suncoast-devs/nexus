import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'

import history from '@/history'
import { Layout } from '@/components/Layout'
import { QueryClient, QueryClientProvider } from 'react-query'

export function App() {
  const queryClient = new QueryClient()

  const [, setErrors] = useState<string[]>([])

  // Sets up an effect that watches for page changes and clears the
  // errors collection when it does.
  useEffect(() => {
    const unlisten = history.listen(() => setErrors([]))

    return () => unlisten()
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Layout />
      </Router>
    </QueryClientProvider>
  )
}
