import React from 'react'
import useModelData from '/src//hooks/useModelData'
import { Homework } from '/src//components/models'
import { MarkDownDiv } from '/src//components/utils/MarkDownDiv'

export function ShowHomeworkPage({ cohortId, homeworkId }) {
  const { loading, data: homework } = useModelData(() => Homework.find(homeworkId))

  if (loading) {
    return <></>
  }

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1>{homework.title}</h1>
          <MarkDownDiv markdown={homework.bodyWithResolvedUrls} />
        </div>
      </div>
    </section>
  )
}
