export function generateTasksById(tasks) {
  return tasks.reduce((taskObject, task) => (
    Object.assign(taskObject, { [task.id]: task })
  ), {});
}

export function generateGroupsById(tasks) {
  const groupsByName = _generateGroupsByName(tasks);
  return Object.values(groupsByName);
}

function _generateGroupsByName(tasks) {
  let currentGroupId = 1;

  return tasks.reduce((groupObject, task) => {
    if (groupObject.hasOwnProperty(task.group)) {
      groupObject[task.group].taskIds.push(task.id);
      return groupObject;
    }

    groupObject[task.group] = {
      id: currentGroupId,
      title: task.group,
      taskIds: [task.id]
    };

    currentGroupId++;

    return groupObject;
  }, {});
};
