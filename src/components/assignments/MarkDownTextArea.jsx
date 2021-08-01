import React, { useState } from 'react'
import cx from 'classnames'
import SimpleMdeReact from 'react-simplemde-editor'
import useProfile from '@/hooks/useProfile'

export const options = {
  indentWithTabs: false,
  lineNumbers: true,
  previewRender: null,
  uploadImage: false,
  toolbar: [
    'bold',
    'italic',
    'quote',
    'unordered-list',
    'ordered-list',
    'link',
    'image',
    'strikethrough',
    'code',
    'table',
    'redo',
    'heading',
    'undo',
    'clean-block',
    'horizontal-rule',
    'guide',
  ],
}

export function MarkDownTextArea({ value, updateValue }) {
  const { profile } = useProfile()

  const [useMdeEditor, setUseMdeEditor] = useState(function () {
    // If the user has a preference for using the markdown editor (or not)
    const useMarkDownEditorProfile = localStorage.getItem('use-markdown-editor')

    // ... then use that
    if (useMarkDownEditorProfile !== null) {
      return 'true' === useMarkDownEditorProfile
    }

    // Otherwise turn it on by default for non-admin users.
    return !profile.isAdmin
  })

  function enableMdeEditor(event) {
    event.preventDefault()

    localStorage.setItem('use-markdown-editor', 'true')

    setUseMdeEditor(true)
  }

  function disableMdeEditor(event) {
    event.preventDefault()

    localStorage.setItem('use-markdown-editor', 'false')

    setUseMdeEditor(false)
  }

  return (
    <div className="mb-2">
      <p className="panel-tabs mb-2">
        <a
          onClick={event => enableMdeEditor(event)}
          className={cx({ 'is-active': useMdeEditor }, 'text-decoration-none')}
        >
          Markdown Editor
        </a>
        <a
          onClick={event => disableMdeEditor(event)}
          className={cx({ 'is-active': !useMdeEditor }, 'text-decoration-none')}
        >
          Markdown Plain
        </a>
      </p>
      <div className="control markdown-edit">
        {useMdeEditor ? (
          <SimpleMdeReact options={options} value={value} onChange={newValue => updateValue(newValue)} />
        ) : (
          <textarea className="textarea" value={value} onChange={event => updateValue(event.target.value)} />
        )}
      </div>
    </div>
  )
}
