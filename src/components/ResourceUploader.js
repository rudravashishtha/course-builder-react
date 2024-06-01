// src/components/ResourceUploader.js
import React, { useState } from 'react';
import './ResourceUploader.css';

const ResourceUploader = ({ addResource }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setName(uploadedFile.name);
    }
  };

  const handleAddResource = () => {
    if (file || link) {
      addResource({ name, file, link });
      setName('');
      setFile(null);
      setLink('');
    }
  };

  return (
    <div className="resource-uploader">
      <h3>Upload Resource</h3>
      <input
        type="text"
        placeholder="Resource name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="file"
        onChange={handleFileUpload}
      />
      <input
        type="url"
        placeholder="Resource link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleAddResource}>Add Resource</button>
    </div>
  );
};

export default ResourceUploader;
