import React, { useEffect, useState } from 'react'
import renderContent from '@github-docs/render-content'
export const MarkDownDiv = ({ markdown }) => {
  const [renderedContent, setRenderedContent] = useState('')

  useEffect(() => {
    async function renderMarkDown() {
      const markdownHTML = await renderContent(markdown, {})
      setRenderedContent(markdownHTML)
    }

    renderMarkDown()
  }, [markdown])

  return <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
}
