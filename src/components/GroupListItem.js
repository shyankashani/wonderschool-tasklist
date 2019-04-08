import React from 'react';
import { Link } from 'react-router-dom';
import { filter } from 'lodash';
import { ReactComponent as Group } from '../assets/Group.svg';

function GroupListItem({ group, tasksById }) {
  const numTasks = group.taskIds.length;
  const numTasksCompleted = filter(group.taskIds, id => tasksById[id].completedAt).length;

  return (
    <Link to={`/group/${group.id}`}>
      <div className='row align-items-center py-4 border-bottom'>
        <div className='col-1 p-0'>
          <Group />
        </div>
        <div className='col p-0'>
          <div className='row text-dark font-weight-bold'>
            <div className='col p-0'>
              {group.title}
            </div>
          </div>
          <div className='row text-secondary'>
            <div className='col p-0'>
              {numTasksCompleted} of {numTasks} COMPLETE
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GroupListItem;
