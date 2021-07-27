import React from 'react'
import { LoadingButton } from '/src/components/utils/LoadingButton'

export function EditorButtons({ onDone, onSkip }) {
  return (
    <div className="buttons">
      <LoadingButton className="is-link" onClick={onDone}>
        Done
      </LoadingButton>
      <button className="button is-warning" onClick={onSkip}>
        Skip
      </button>
    </div>
  )
}
