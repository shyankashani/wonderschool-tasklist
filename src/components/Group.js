import React from 'react';
import { Link } from 'react-router-dom';

import Task from './Task';

function Group({ match, groupsById, tasksById, toggleCheckTask }) {
  const group = groupsById[match.params.id];

  return group ? (
      <div className='container p-5'>
        <div className='row py-2 border-bottom'>
          <div className='col p-0'>
            <h4>
              {group.title}
            </h4>
          </div>
          <div className='col p-0 text-right'>
            <Link to='/' className='btn btn-link'>
              ALL GROUPS
            </Link>
          </div>
        </div>
        {group.taskIds.map((taskId, i) => (
          <Task
            key={i}
            task={tasksById[taskId]}
            tasksById={tasksById}
            toggleCheckTask={toggleCheckTask}
          />
        ))}
      </div>
    ) : (
      <div>
        Loading...
      </div>
    )
}

export default Group;
