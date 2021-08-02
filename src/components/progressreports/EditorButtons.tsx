import React from 'react'
import { LoadingButton, LoadingButtonOnClick } from '@/components/utils/LoadingButton'

export function EditorButtons({ onDone, onSkip }: { onDone: LoadingButtonOnClick; onSkip: () => void }) {
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
