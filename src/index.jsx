import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '@/components/App'
import '@/styles/screen.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'bulma-extensions/bulma-tooltip/dist/css/bulma-tooltip.min.css'
import * as Sentry from '@sentry/browser'

if (import.meta.env.SENTRY_DSN) {
  Sentry.init({ dsn: import.meta.env.SENTRY_DSN })
}
ReactDOM.render(<App />, document.getElementById('root'))
