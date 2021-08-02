import { SpraypaintBase } from 'spraypaint'
import { CollectionProxy, RecordProxy } from 'spraypaint/lib-esm/proxies'

export { Cohort } from './Cohort'
export { Program } from './Program'
export { Unit } from './Unit'
export { LectureVideo } from './LectureVideo'
export { Person } from './Person'
export { Profile } from './Profile'
export { StudentEnrollment } from './StudentEnrollment'
export { CohortDate } from './CohortDate'
export { AttendanceRecord } from './AttendanceRecord'
export { Homework } from './Homework'
export { Assignment } from './Assignment'
export { ProgressReport } from './ProgressReport'
export { StudentProgressReport } from './StudentProgressReport'
export { AssignmentEvent } from './AssignmentEvent'
export { HandbookAssignment } from './HandbookAssignment'
export { LectureVideoPlayback } from './LectureVideoPlayback'

export function UnProxyCollection<T extends SpraypaintBase>(collection: CollectionProxy<T>) {
  if (collection.data) {
    return Promise.resolve(collection.data as T[])
  } else {
    return Promise.resolve({} as T[])
  }
}

export function UnProxyRecord<T extends SpraypaintBase>(record: RecordProxy<T>) {
  if (record.data) {
    return Promise.resolve(record.data as T)
  } else {
    return Promise.resolve(undefined)
  }
}
