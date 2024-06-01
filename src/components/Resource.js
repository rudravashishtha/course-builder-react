// src/components/Resource.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Resource.css';

const Resource = ({ resource, resourceIndex, setModules, moduleIndex }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'RESOURCE',
    item: { resourceIndex, moduleIndex },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'RESOURCE',
    drop: (item) => {
      if (item.resourceIndex !== resourceIndex || item.moduleIndex !== moduleIndex) {
        moveResource(item.resourceIndex, item.moduleIndex, resourceIndex, moduleIndex);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveResource = (dragIndex, dragModuleIndex, hoverIndex, hoverModuleIndex) => {
    setModules((prevModules) => {
      const updatedModules = [...prevModules];
      const draggedResource = updatedModules[dragModuleIndex].resources.splice(dragIndex, 1)[0];
      updatedModules[hoverModuleIndex].resources.splice(hoverIndex, 0, draggedResource);
      return updatedModules;
    });
  };

  const renameResource = () => {
    const newName = prompt('Enter new resource name', resource.name);
    if (newName) {
      setModules((prevModules) =>
        prevModules.map((module, mIndex) =>
          mIndex === moduleIndex
            ? {
                ...module,
                resources: module.resources.map((r, rIndex) =>
                  rIndex === resourceIndex ? { ...r, name: newName } : r
                ),
              }
            : module
        )
      );
    }
  };

  const deleteResource = () => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setModules((prevModules) =>
        prevModules.map((module, mIndex) =>
          mIndex === moduleIndex
            ? {
                ...module,
                resources: module.resources.filter((r, rIndex) => rIndex !== resourceIndex),
              }
            : module
        )
      );
    }
  };

  return (
    <div ref={(node) => drag(drop(node))} className={`resource ${isDragging ? 'dragging' : ''} ${isOver ? 'over' : ''}`}>
      <span>{resource.name}</span>
      <button onClick={renameResource}>Rename</button>
      <button onClick={deleteResource}>Delete</button>
    </div>
  );
};

export default Resource;
