import React from 'react';

const ExportImport = ({ lists }) => {
  const exportData = () => {
    const data = {};
    lists.forEach(list => {
      data[list] = JSON.parse(localStorage.getItem(list)) || [];
    });
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task-lists.json';
    a.click();
  };

  const importData = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        Object.keys(importedData).forEach(list => {
          localStorage.setItem(list, JSON.stringify(importedData[list]));
        });
        alert('Import successful!');
        window.location.reload();
      } catch (error) {
        alert('Invalid JSON file.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div className="export-import">
      <button onClick={exportData}>Export Lists</button>
      <input type="file" accept="application/json" onChange={importData} />
    </div>
  );
};

export default ExportImport;
