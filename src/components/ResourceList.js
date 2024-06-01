// src/components/ResourceList.js
import React from 'react';
import Resource from './Resource';
import './ResourceList.css';

const ResourceList = ({ resources, setModules, moduleIndex }) => {
  return (
    <div className="resource-list">
      {resources.map((resource, index) => (
        <Resource key={resource.id} resource={resource} resourceIndex={index} setModules={setModules} moduleIndex={moduleIndex} />
      ))}
    </div>
  );
};

export default ResourceList;
