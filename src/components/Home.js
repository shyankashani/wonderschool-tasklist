import React from 'react';

import GroupListItem from './GroupListItem';

function Home({ groups, tasksById }) {
  return (
    <div className='container p-5'>
      <div className='row py-2 border-bottom'>
        <div className='col p-0'>
          <h4>
            Things To Do
          </h4>
        </div>
      </div>
        {groups.map((group, i) => (
          <GroupListItem
            key={i}
            group={group}
            tasksById={tasksById}
          />
        ))}
    </div>
  )
}

export default Home;
