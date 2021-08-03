import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'

import history from '@/history'
import { Layout } from '@/components/Layout'
import useProfile from '@/hooks/useProfile'
import { QueryClient, QueryClientProvider } from 'react-query'

export function App() {
  const { profile, forceUpdateProfile } = useProfile()

  const queryClient = new QueryClient()

  const [errors, setErrors] = useState<string[]>([])

  // Sets up an effect that watches for page changes and clears the
  // errors collection when it does.
  useEffect(() => {
    const unlisten = history.listen((location, action) => setErrors([]))

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
