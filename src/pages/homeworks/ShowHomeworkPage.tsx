import React from 'react'
import { Homework, UnProxyRecord } from '@/components/models'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import { useQuery } from 'react-query'

export function ShowHomeworkPage({ cohortId, homeworkId }: { cohortId: string; homeworkId: string }) {
  const { isLoading, data: homework = new Homework() } = useQuery(['homework', cohortId, homeworkId], () =>
    Homework.find(homeworkId).then(UnProxyRecord)
  )

  if (isLoading) {
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
