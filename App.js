import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BurgerMenu from './components/BurgerMenu';
import TaskList from './components/TaskList';
import './styles/App.css';

function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
    setLists(storedLists);
  }, []);

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  const addList = (listName) => {
    if (!lists.includes(listName)) {
      setLists([...lists, listName]);
    }
  };

  // Dark Mode Handling
  useEffect(() => {
    const matchDark = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (e.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    };
    handleChange(matchDark);
    matchDark.addEventListener('change', handleChange);
    return () => matchDark.removeEventListener('change', handleChange);
  }, []);

  return (
    <Router>
      <BurgerMenu lists={lists} addList={addList} />
      <div id="page-wrap">
        <Switch>
          <Route path="/list/:listName">
            <TaskList />
          </Route>
          <Route path="/">
            <h1>Welcome to Your Notes App</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
