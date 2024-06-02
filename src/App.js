// src/App.js
import React, { useState } from 'react';
import ModuleList from './components/ModuleList';
import AddButton from './components/AddButton';
import './App.css';

const App = () => {
  const [modules, setModules] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Course Builder</h1>
        <AddButton setModules={setModules} />
      </header>
      <div className="content">
        {modules.length === 0 ? (
          <div className="empty-state">
            <img src="empty.png" alt="Empty State" />
            <p>Nothing added here yet</p>
            <p>Click on the [+] Add button to add items to this course</p>
          </div>
        ) : (
          <ModuleList modules={modules} setModules={setModules} />
        )}
      </div>
    </div>
  );
};

export default App;
