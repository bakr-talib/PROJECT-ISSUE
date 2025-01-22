import React, { useState } from "react";

const EditIssue = ({ onEditIssue }) => {
  const [documentId, setDocumentId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleEdit = () => {
    if (!documentId || !title || !description) {
      alert("Please fill in all fields!");
      return;
    }
    onEditIssue({ documentId, title, description });
    setDocumentId("");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Edit Issue</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Document ID"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          placeholder="New Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <textarea
          placeholder="New Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        ></textarea>
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          Edit Issue
        </button>
      </div>
    </div>
  );
};

export default EditIssue;
