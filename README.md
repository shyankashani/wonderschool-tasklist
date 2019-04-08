# Wonderschool Task List

## 1. React Task List

### `npm install`

Installs dependencies.

### `npm start`

Starts the app in development mode at [http://localhost:3000](http://localhost:3000).


#### Tools used:
- `react-router` to enable displaying of task groups by params.
- `immutability-helper` to assist with immutability in React state.
- `moment` to generate timestamps for tasks' `completed_at`.
- `lodash` for a few utility functions.
- `bootstrap` for styling.

## 2. SQL Database Schema

```SQL

/*
Based on the provided payload, it was assumed that every task belongs to a single task group.
*/
CREATE TABLE tasks (
  id INT NOT NULL AUTO_INCREMENT,
  group_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  completed_at DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (group_id) REFERENCES task_groups(id)
);

CREATE TABLE task_groups (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

/*
The below table enables a many-to-many relationship of dependency between tasks.
A single task may have many dependent tasks, and many tasks on which it depends.
`task_id` refers to the task which has another task dependent on it.
`dependent_task_id` refers to the task which is dependent on the above task.
*/
CREATE TABLE task_dependencies (
  id INT NOT NULL AUTO_INCREMENT,
  task_id INT NOT NULL,
  dependent_task_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (task_id) REFERENCES tasks(id),
  FOREIGN KEY (dependent_task_id) REFERENCES tasks(id)
);
```

## 3. Check/Uncheck Task API

### `PATCH` `/tasks/{task_id}`

#### URL
```http://api.wonderschool-tasklist.com/tasks/{task_id}```

#### Request Payload Format
`object`

| key | value | description |
| :- | :- | :- |
| `completed_at` | `string` or `null` | ISO 8601 string representing the date/time of the task's completion |
```JSON
  {
    "completed_at": "2015-03-01T12:00:00.000Z"
  }
```

#### Response Payload Format
`object`

| key | value | description |
| :- | :- | :- |
| `id` | `integer` |
| `group_id` | `integer` | ID of the group to which this task belongs |
| `title` | `string` | Title of the task |
| `dependency_ids` | `array` of `integer` | IDs of the tasks on which this task depends |
| `completed_at` | `string` or `null` | ISO 8601 string representing the date/time of the task's completion |

```JSON
  {
    "id": 8,
    "group_id": 2,
    "title": "Have a snack",
    "dependency_ids": [],
    "completedAt": null,
  }
```
