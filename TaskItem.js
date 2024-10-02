import React from 'react';

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className="task-item">
      <input 
        type="checkbox" 
        checked={task.checked} 
        onChange={toggleTask} 
      />
      <span style={{ textDecoration: task.checked ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
};

export default TaskItem;
