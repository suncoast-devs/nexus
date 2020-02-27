export const neededHomeworksToExceedPercentage = ({ homeworks, person, neededPercentage = 80 }) => {
  const countedHomeworks = homeworks.filter(homework => homework.countsTowardsCompletion).length
  if (countedHomeworks === 0) {
    return null
  }

  return Math.max((countedHomeworks * 100.0) / neededPercentage - completedHomeworks({ homeworks, person }))
}

export const completedHomeworks = ({ homeworks, person }) => {
  return homeworks.filter(homework => {
    const assignment = homework.assignments.find(assignment => assignment.person.id === person.id)
    return assignment && homework.countsTowardsCompletion && assignment.completed
  })
}

export const homeworkCompletedPercentage = ({ homeworks, person }) => {
  const countedHomeworks = homeworks.filter(homework => homework.countsTowardsCompletion).length
  if (countedHomeworks === 0) {
    return 'N/A'
  }
  return ((completedHomeworks({ homeworks, person }).length * 100.0) / countedHomeworks).toFixed(1)
}
