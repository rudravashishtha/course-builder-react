// src/components/ModuleList.js
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Module from './Module';
import './ModuleList.css';

const ModuleList = ({ modules, setModules }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="module-list">
        {modules.map((module, index) => (
          <Module key={module.id} module={module} index={index} setModules={setModules} />
        ))}
      </div>
    </DndProvider>
  );
};

export default ModuleList;
