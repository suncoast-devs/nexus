import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/components/App'
import '@/styles/screen.scss'
import 'easymde/dist/easymde.min.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'bulma-extensions/bulma-tooltip/dist/css/bulma-tooltip.min.css'
import * as Sentry from '@sentry/browser'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SENTRY_DSN } from './env'

if (SENTRY_DSN) {
  Sentry.init({ dsn: SENTRY_DSN })
}

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
