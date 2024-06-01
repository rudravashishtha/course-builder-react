// src/components/AddButton.js
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import './AddButton.css';

const AddButton = ({ setModules }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddModule = () => {
    const moduleName = prompt('Enter module name');
    if (moduleName) {
      setModules((prevModules) => [
        ...prevModules,
        { id: Date.now(), name: moduleName, resources: [] },
      ]);
    }
  };

  const handleAddLink = () => {
    const linkName = prompt('Enter link name');
    const linkUrl = prompt('Enter link URL');
    if (linkName && linkUrl) {
      setModules((prevModules) => [
        ...prevModules,
        { id: Date.now(), name: linkName, resources: [{ name: linkName, url: linkUrl }] },
      ]);
    }
  };

  const handleUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Specify the accepted file types

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        // Perform the file upload logic here
        // You can use libraries like axios or fetch to send the file to the server
        // Example:
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response from the server
            console.log('File uploaded successfully:', data);
          })
          .catch((error) => {
            // Handle any errors that occurred during the upload
            console.error('Error uploading file:', error);
          });
      }
    });

    fileInput.click();
  };

  return (
    <div className="add-button">
      <button onClick={() => setIsOpen(!isOpen)}>
        <FaPlus /> Add
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={handleAddModule}>Create module</button>
          <button onClick={handleAddLink}>Add a link</button>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default AddButton;
