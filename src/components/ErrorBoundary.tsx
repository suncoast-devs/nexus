import React, { Component } from 'react'
// @ts-ignore - no types
import * as Sentry from '@/sentry/browser'

export class ErrorBoundary extends Component {
  state = {
    error: null,
    eventId: null,
  }

  // @ts-ignore - no types
  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    // @ts-ignore - no types
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  render() {
    if (this.state.error) {
      // render fallback UI
      return <a onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</a>
    } else {
      return this.props.children
    }
  }
}
