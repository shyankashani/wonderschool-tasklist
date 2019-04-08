import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import update from 'immutability-helper'
import moment from 'moment';

import { getTasks } from './queries/tasks';
import { generateTasksById } from './utilities/tasks';
import { generateGroupsById } from './utilities/groups';
import Home from './components/Home';
import Group from './components/Group';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksById: {},
      groupsById: {}
    }
  }

  componentDidMount() {
    const tasks = getTasks();
    const tasksById = generateTasksById(tasks);
    const groupsById = generateGroupsById(tasks);

    this.setState({ tasksById, groupsById });
  }

  toggleCheckTask(taskId) {
    this.setState(prevState => {
      const prevCompletedAt = prevState.tasksById[taskId].completedAt;
      const newCompletedAt = prevCompletedAt ? null : moment().toISOString;

      return update(prevState, {
        tasksById: {
          [taskId]: {
            completedAt: { $set: newCompletedAt }
          }
        }
      });
    });
  }

  render() {
    const { tasksById, groupsById } = this.state;
    const toggleCheckTask = this.toggleCheckTask.bind(this);
    const groups = Object.values(groupsById);

    return (
      <Router>
        <Route
          exact path='/'
          render={props => (
            <Home
              {...props}
              groups={groups}
              tasksById={tasksById}
            />
          )}
        />

        <Route
          path='/group/:id'
          render={props => (
            <Group
              {...props}
              groupsById={groupsById}
              tasksById={tasksById}
              toggleCheckTask={toggleCheckTask}
            />
          )}
        />

      </Router>
    );
  }
}

export default App;
