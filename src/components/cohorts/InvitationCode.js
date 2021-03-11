import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export function InvitationCode({ invitationCode }) {
  const [toolTipText, setToolTipText] = useState('Click to Copy URL')

  return (
    <CopyToClipboard
      text={`${window.location.origin}/redeem/${invitationCode}`}
      onCopy={() => setToolTipText('Copied')}
    >
      <span className="tooltip" style={{ cursor: 'pointer' }} data-tooltip={toolTipText}>
        <code>{invitationCode}</code>
      </span>
    </CopyToClipboard>
  )
}
