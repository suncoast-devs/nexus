import React, { useEffect, useState } from 'react'
// import githubMarkdownRender from 'github-markdown-render'

export function MarkDownDiv({ markdown }) {
  const [renderedContent, setRenderedContent] = useState('')

  useEffect(() => {
    async function renderMarkDown() {
      const response = await fetch('https://api.github.com/markdown', {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+jso',
        },
        body: JSON.stringify({ text: markdown }),
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
