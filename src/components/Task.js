import React from 'react';
import { some } from 'lodash';
import { ReactComponent as Completed } from '../assets/Completed.svg';
import { ReactComponent as Incomplete } from '../assets/Incomplete.svg';
import { ReactComponent as Locked } from '../assets/Locked.svg';

function Task({ task, tasksById, toggleCheckTask }) {
  const isCompleted = task.completedAt ? true : false;
  const isLocked = some(task.dependencyIds, id => !tasksById[id].completedAt);
  const taskTitle = task.task;

  return (
    <div className='row py-4 border-bottom'>
      <div className='col-1 p-0'>
        { isLocked
        ? <Locked />
        : isCompleted
        ? <Completed onClick={() => toggleCheckTask(task.id)}/>
        : <Incomplete onClick={() => toggleCheckTask(task.id)}/>
        }
      </div>
      <div className='col p-0'>
        {taskTitle}
      </div>
    </div>
  )
}

export default Task;
