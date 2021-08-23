import React from 'react'
import { Homework } from '@/components/models'
import { MarkDownDiv } from '@/components/utils/MarkDownDiv'
import useProfile from '@/hooks/useProfile'

export function HomeworkMarkdown({ homework }: { homework: Homework }) {
  const { isLoading, profile } = useProfile()

  if (isLoading) {
    return <></>
  }

  const homeworkWithGithubUserReplaced = homework.bodyWithResolvedUrls.replaceAll('$GITHUB_USER', profile.github)

  return <MarkDownDiv markdown={homeworkWithGithubUserReplaced} />
}
