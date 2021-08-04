import { LectureVideo } from '../models'

export const compareLectureVideoDates = (a: LectureVideo, b: LectureVideo) => {
  if (!a.presentedOn || !b.presentedOn) {
    return 0
  }

  const aPresentedOn = Date.parse(a.presentedOn)
  const bPresentedOn = Date.parse(b.presentedOn)

  // If the times are equal, use the createdAt time to order the videos
  if (aPresentedOn - bPresentedOn === 0) {
    const aCreatedAt = Date.parse(a.createdAt)
    const bCreatedAt = Date.parse(b.createdAt)

    return bCreatedAt - aCreatedAt
  } else {
    return bPresentedOn - aPresentedOn
  }
}
