import React, { useState } from "react";

const AddIssue = () => {
  const [newIssue, setNewIssue] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIssue((prevIssue) => ({ ...prevIssue, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newIssue }),
      });
      if (!response.ok) throw new Error("Failed to add issue");
      alert("Issue added successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6  border-2 border-[var(--contrasting-color)] backdrop-blur-[2px] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 ">Add Issue</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium  mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={newIssue.title}
          onChange={handleChange}
          placeholder="Enter issue title"
          className="w-full px-4 py-2 border  border-[var(--primary-color)] rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium  mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={newIssue.description}
          onChange={handleChange}
          placeholder="Enter issue description"
          rows="4"
          className="w-full px-4 py-2  border  border-[var(--primary-color)] rounded"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-[var(--primary-color)] text-white py-2 px-4 rounded-md"
      >
        Add
      </button>
    </div>
  );
};

export default AddIssue;
