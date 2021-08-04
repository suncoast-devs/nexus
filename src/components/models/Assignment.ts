import { Attr, Model, BelongsTo, HasMany } from 'spraypaint'
import { AssignmentEvent, Homework, Person, StudentEnrollment } from '.'
import { ApplicationRecord } from './ApplicationRecord'

export type ScoreInfoType = {
  title: string
  progressReportTitle?: string
  style: {
    iconColor: string
    buttonColor: string
    textColor: string
    progressReportTextColor?: string
    progressReportBackgroundColor?: string
  }
}
@Model()
export class Assignment extends ApplicationRecord {
  static jsonapiType = 'assignments'

  @Attr() score!: number
  @Attr() issue!: number
  @Attr() personId!: string
  @Attr() studentEnrollmentId!: string
  @Attr() homeworkId!: string
  @Attr() turnedIn!: boolean
  @Attr() createdAt!: string
  @Attr() overdue!: string
  @Attr() completed!: boolean

  @BelongsTo() person!: Person
  @BelongsTo() studentEnrollment!: StudentEnrollment
  @BelongsTo() homework!: Homework
  @HasMany() assignmentEvents!: AssignmentEvent[]

  scoreInfo() {
    return Assignment.scoreInfo(this.score)
  }

  static minimumAcceptableScore = 2

  static graded(score: number) {
    return score > 0
  }

  static needsGrade(score: number) {
    return !Assignment.graded(score)
  }

  static scoreInfo(score: number | string) {
    const scoreAsInt = Number(score)

    return Assignment.graded(scoreAsInt) ? Assignment.scoreInfos[scoreAsInt] : Assignment.noScore
  }

  static noScore: ScoreInfoType = {
    title: 'Not Graded',
    progressReportTitle: 'Not Completed',
    style: {
      iconColor: 'black',
      buttonColor: 'white',
      textColor: 'black',
      progressReportTextColor: 'white',
      progressReportBackgroundColor: 'rgb(217, 83, 79)',
    },
  }

  static scoreInfos: ScoreInfoType[] = [
    {
      title: 'Unacceptable',
      style: {
        iconColor: 'black',
        buttonColor: 'white',
        textColor: 'black',
        progressReportTextColor: 'white',
        progressReportBackgroundColor: 'rgb(217, 83, 79)',
      },
    },
    {
      title: 'Needs Improvement',
      style: {
        buttonColor: 'rgb(217, 83, 79)',
        iconColor: 'rgb(217, 83, 79)',
        textColor: 'white',
      },
    },
    {
      title: 'Acceptable',
      style: {
        buttonColor: 'rgb(240, 173, 78)',
        iconColor: 'rgb(240, 173, 78)',
        textColor: 'white',
      },
    },
    {
      title: 'Meets Expectation',
      style: {
        buttonColor: 'rgb(49, 176, 213)',
        iconColor: 'rgb(49, 176, 213)',
        textColor: 'white',
      },
    },
    {
      title: 'Exceeds Expectation',
      style: {
        buttonColor: 'rgb(51, 122, 183)',
        iconColor: 'rgb(51, 122, 183)',
        textColor: 'white',
      },
    },
  ]
}
