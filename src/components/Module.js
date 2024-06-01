// src/components/Module.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ResourceList from './ResourceList';
import './Module.css';

const Module = ({ module, index, setModules }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MODULE',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'MODULE',
    drop: (item) => {
      if (item.index !== index) {
        moveModule(item.index, index);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveModule = (dragIndex, hoverIndex) => {
    setModules((prevModules) => {
      const updatedModules = [...prevModules];
      const [movedModule] = updatedModules.splice(dragIndex, 1);
      updatedModules.splice(hoverIndex, 0, movedModule);
      return updatedModules;
    });
  };

  const renameModule = () => {
    const newName = prompt('Enter new module name', module.name);
    if (newName) {
      setModules((prevModules) =>
        prevModules.map((m) => (m.id === module.id ? { ...m, name: newName } : m))
      );
    }
  };

  const deleteModule = () => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      setModules((prevModules) => prevModules.filter((m) => m.id !== module.id));
    }
  };

  return (
    <div ref={(node) => drag(drop(node))} className={`module ${isDragging ? 'dragging' : ''} ${isOver ? 'over' : ''}`}>
      <div className="module-header">
        <h3>{module.name}</h3>
        <div className="module-actions">
          <button onClick={renameModule}>Rename</button>
          <button onClick={deleteModule}>Delete</button>
        </div>
      </div>
      <ResourceList resources={module.resources} setModules={setModules} moduleIndex={index} />
    </div>
  );
};

export default Module;
