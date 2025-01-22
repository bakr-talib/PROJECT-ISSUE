import React, { useState } from "react";

const AddIssue = ({ onAddIssue }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title || !description) {
      alert("Please fill in all fields!");
      return;
    }
    onAddIssue({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Add New Issue</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Issue
        </button>
      </div>
    </div>
  );
};

export default AddIssue;
