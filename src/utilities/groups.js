export function generateGroupsById(tasks) {
  const groupsByName = _generateGroupsByName(tasks);
  const groups = Object.values(groupsByName);

  return groups.reduce((groupObject, group) => (
    Object.assign(groupObject, { [group.id]: group })
  ), {});
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
