import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import auth from '@/Auth'
import prettyBytes from 'pretty-bytes'

export function AssignmentEventAttachment({ id }: { id: number }) {
  const [attachmentDetails, setAttachmentDetails] = useState<{
    filename?: string
    content_type?: string
    byte_size?: number
  }>({})
  const [attachmentURL, setAttachmentURL] = useState<string>('')

  useEffect(() => {
    async function load() {
      const response = await fetch(`${import.meta.env.VITE_PYLON_URL}/direct_uploads/${id}/meta`, {
        headers: { Authorization: `Token token="${auth.token}"` },
      })

      if (response.ok) {
        const data = await response.json()
        setAttachmentDetails(data.blob)
        setAttachmentURL(data.url)
      }
    }

    load()
  }, [id])

  const icon =
    getFontAwesomeIconFromExtension(attachmentDetails.filename || '') ||
    getFontAwesomeIconFromMIME(attachmentDetails.content_type || '')

  return (
    <li>
      <a target="_blank" href={attachmentURL}>
        <span className="icon-text">
          <span className="icon">
            <i className={cx('pr-3', 'fa-2x', icon)} />
          </span>
          <span>{attachmentDetails.filename}</span>
        </span>
        {attachmentDetails.byte_size ? (
          <span className="is-pulled-right">{prettyBytes(attachmentDetails.byte_size)}</span>
        ) : null}
      </a>
    </li>
  )
}

const mimeToFontAwesomeIconMap: Record<string, string> = {
  // Media
  image: 'far fa-file-image',
  audio: 'far fa-file-audio',
  video: 'far fa-file-video',

  // Code
  'text/x-c++': 'far fa-file-code',
  'text/x-ruby-script': 'far fa-file-code',

  // Documents
  'application/pdf': 'far fa-file-pdf',
  'application/msword': 'far fa-file-word',
  'application/vnd.ms-word': 'far fa-file-word',
  'application/vnd.oasis.opendocument.text': 'far fa-file-word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml': 'far fa-file-word',
  'application/vnd.ms-excel': 'far fa-file-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml': 'far fa-file-excel',
  'application/vnd.oasis.opendocument.spreadsheet': 'far fa-file-excel',
  'application/vnd.ms-powerpoint': 'far fa-file-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml': 'far fa-file-powerpoint',
  'application/vnd.oasis.opendocument.presentation': 'far fa-file-powerpoint',
  'text/plain': 'far fa-file-text',
  'text/html': 'far fa-file-code',
  'application/json': 'far fa-file-code',

  // Archives
  'application/gzip': 'fa-file-archive',
  'application/zip': 'fa-file-archive',
}

function getFontAwesomeIconFromExtension(fileName: string) {
  const extension = (fileName || ')').split('.').pop()

  switch (extension) {
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
    case 'cs':
    case 'html':
      return 'far fa-file-code'
    case 'md':
      return 'far fa-file-alt'
    case 'pdf':
      return 'far fa-file-pdf'
  }

  return null
}

function getFontAwesomeIconFromMIME(mimeType: string) {
  if (mimeType) {
    for (const key in mimeToFontAwesomeIconMap) {
      if (mimeType.includes(key)) {
        return mimeToFontAwesomeIconMap[key]
      }
    }
  }

  return 'far fa-file'
}
