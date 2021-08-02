import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Homework } from '@/components/models'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'

export function ShowHomeworkPage({ cohortId, homeworkId }) {
  const { loading, data: homework } = useModelData(() => Homework.find(homeworkId))

  if (loading) {
    return <></>
  }

  return (
    <section className="section">
      <div className="container">
        <div className="content mb-4">
          <h1>{homework.title}</h1>
          <MarkDownDiv markdown={homework.bodyWithResolvedUrls} />
        </div>
      </div>
    </section>
  )
}
