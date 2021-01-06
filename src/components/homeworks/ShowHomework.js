import React from 'react'
import useModelData from '@/hooks/useModelData'
import { Homework } from '@/components/models'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'

export const ShowHomework = ({ cohortId, homeworkId }) => {
  const { loading, data: homework, reload } = useModelData(() => Homework.find(homeworkId))

  if (loading) {
    return <></>
  }

  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <h1>{homework.title}</h1>
          <MarkDownDiv markdown={homework.body_with_resolved_urls} />
        </div>
      </div>
    </section>
  )
}
