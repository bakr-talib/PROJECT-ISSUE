import React, { useState } from "react";

const DeleteIssue = ({ onDeleteIssue }) => {
  const [documentId, setDocumentId] = useState("");

  const handleDelete = () => {
    if (!documentId) {
      alert("Please enter a valid Document ID!");
      return;
    }

    onDeleteIssue(documentId);
    setDocumentId(""); // تفريغ الحقل بعد الحذف
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-2">Delete Issue</h2>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Document ID"
          value={documentId}
          onChange={(e) => setDocumentId(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete Issue
        </button>
      </div>
    </div>
  );
};

export default DeleteIssue;
