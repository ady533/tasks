import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { listName } = useParams();
  const decodedListName = decodeURIComponent(listName);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(decodedListName)) || [];
    setTasks(storedTasks);
  }, [decodedListName]);

  useEffect(() => {
    localStorage.setItem(decodedListName, JSON.stringify(tasks));
  }, [tasks, decodedListName]);

  const addTask = (taskText) => {
    setTasks([...tasks, { text: taskText, checked: false }]);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, checked: !task.checked } : task
    );
    setTasks(newTasks);
  };

  const resetTasks = () => {
    const reset = tasks.map(task => ({ ...task, checked: false }));
    setTasks(reset);
  };

  return (
    <div className="task-list">
      <h2>{decodedListName}</h2>
      <TaskInput addTask={addTask} />
      <ul>
        {tasks.map((task, index) => (
          <TaskItem 
            key={index} 
            task={task} 
            toggleTask={() => toggleTask(index)} 
            deleteTask={() => deleteTask(index)} 
          />
        ))}
      </ul>
      <button onClick={resetTasks}>Reset Checkboxes</button>
    </div>
  );
};

const TaskInput = ({ addTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleAdd = () => {
    if (taskText.trim() !== '') {
      addTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <div className="task-input">
      <input 
        type="text" 
        value={taskText} 
        onChange={(e) => setTaskText(e.target.value)} 
        placeholder="New Task" 
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TaskList;
