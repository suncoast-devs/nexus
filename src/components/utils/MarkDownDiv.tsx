import React, { useEffect, useState } from 'react'

export function MarkDownDiv({ markdown }: { markdown: string | undefined }) {
  const [renderedContent, setRenderedContent] = useState('')

  useEffect(() => {
    async function renderMarkDown() {
      const response = await fetch(`${import.meta.env.VITE_PYLON_URL}/markdown`, {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+jso',
        },
        body: JSON.stringify({ text: markdown || '' }),
      })

      if (response.ok) {
        const text = await response.text()
        setRenderedContent(text)
      }
    }

    renderMarkDown()
  }, [markdown])

  return <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
}
