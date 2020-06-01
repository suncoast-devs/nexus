export const neededHomeworksToExceedPercentage = ({ homeworks, assignments, neededPercentage = 80 }) => {
  const countedHomeworks = homeworks.filter(homework => homework.countsTowardsCompletion).length
  const completedPercentage = homeworkCompletedPercentage({ homeworks, assignments })

  return countedHomeworks === 0
    ? null
    : Math.ceil(Math.max(0, ((neededPercentage - completedPercentage) / 100.0) * countedHomeworks))
}

export const completedAssignmentCount = ({ assignments }) =>
  assignments.filter(assignment => assignment.homework.countsTowardsCompletion && assignment.completed).length

export const homeworkCompletedPercentage = ({ homeworks, assignments }) => {
  // Only count homeworks that have been assigned to this student AND have been assigned
  const unAssignedHomeworkCount = homeworks.length - assignments.length
  const countsTowardsCompletionHomeworksCount =
    homeworks.filter(homework => homework.countsTowardsCompletion).length - unAssignedHomeworkCount

  if (countsTowardsCompletionHomeworksCount === 0) {
    return 'N/A'
  }

  return (completedAssignmentCount({ assignments }) * 100.0) / countsTowardsCompletionHomeworksCount
}
