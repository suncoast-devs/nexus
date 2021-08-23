import React from 'react'
import { Homework, UnProxyRecord } from '@/components/models'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { HomeworkMarkdown } from './HomeworkMarkdown'

export function ShowHomeworkPage() {
  const { cohortId, homeworkId } = useParams<{ cohortId: string; homeworkId: string }>()
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
          <HomeworkMarkdown homework={homework} />
        </div>
      </div>
    </section>
  )
}
