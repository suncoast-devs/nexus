export const assignedHomeworksForCompletionCount = ({ homeworks, assignments }) => {
  // Only count homeworks that have been assigned to this student AND have been assigned
  const unAssignedHomeworkCount = homeworks.length - assignments.length
  return homeworks.filter(homework => homework.countsTowardsCompletion).length - unAssignedHomeworkCount
}

export const countOfHomeworksNeededToExceedPercentage = ({ homeworks, assignments, neededPercentage = 80 }) => {
  const countsTowardsCompletionHomeworksCount = assignedHomeworksForCompletionCount({ homeworks, assignments })

  const completedPercentage = homeworkCompletedPercentage({ homeworks, assignments })

  return countsTowardsCompletionHomeworksCount === 0
    ? null
    : Math.ceil(Math.max(0, ((neededPercentage - completedPercentage) / 100.0) * countsTowardsCompletionHomeworksCount))
}

export const completedAssignmentsCount = ({ assignments }) =>
  assignments.filter(assignment => assignment.homework.countsTowardsCompletion && assignment.completed).length

export const homeworkCompletedPercentage = ({ homeworks, assignments }) => {
  const countsTowardsCompletionHomeworksCount = assignedHomeworksForCompletionCount({ homeworks, assignments })

  if (countsTowardsCompletionHomeworksCount === 0) {
    return
  }

  return (completedAssignmentsCount({ assignments }) * 100.0) / countsTowardsCompletionHomeworksCount
}
