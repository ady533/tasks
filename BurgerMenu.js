import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import ExportImport from './ExportImport';

const BurgerMenu = ({ lists, addList }) => {
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    if (newListName.trim() !== '') {
      addList(newListName.trim());
      setNewListName('');
    }
  };

  return (
    <Menu>
      <h2>Task Lists</h2>
      <ul>
        {lists.map((list, index) => (
          <li key={index}>
            <Link to={`/list/${encodeURIComponent(list)}`}>{list}</Link>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name"
        />
        <button onClick={handleAddList}>Add List</button>
      </div>
      <ExportImport lists={lists} />
    </Menu>
  );
};

export default BurgerMenu;
