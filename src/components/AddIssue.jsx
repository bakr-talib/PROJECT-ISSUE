import React, { useState } from "react";

const AddIssue = () => {
  const [newIssue, setNewIssue] = useState({
    title: "",
    description: "",
    counter: "",
    issueStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIssue((prevIssue) => ({ ...prevIssue, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      const validStatuses = ["Open", "In-progress", "Closed"];
      const payload = {
        data: {
          title: newIssue.title,
          description: newIssue.description,
          counter: newIssue.counter !== "" ? Number(newIssue.counter) : null,
          issueStatus: newIssue.issueStatus,
        },
      };
  
      // التحقق من القيم المطلوبة
      if (!payload.data.title || !payload.data.description) {
        alert("Please fill in all required fields.");
        return;
      }
  
      // التحقق من صحة القيمة المدخلة لـ issueStatus
      if (!validStatuses.includes(payload.data.issueStatus)) {
        alert(`Invalid status. Please enter one of the following: ${validStatuses.join(", ")}`);
        return;
      }
  
      const response = await fetch("http://localhost:1337/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        throw new Error(errorData.error.message || "Failed to add issue");
      }
  
      alert("Issue added successfully!");
      setNewIssue({ title: "", description: "", counter: "", issueStatus: "" }); // Reset fields
    } catch (err) {
      console.error("Error:", err);
      alert(`Error: ${err.message}`);
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-2 border-[var(--contrasting-color)] backdrop-blur-[2px] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">Add Issue</h2>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={newIssue.title}
          onChange={handleChange}
          placeholder="Enter issue title"
          className="w-full px-4 py-2 border border-[var(--primary-color)] rounded"
        />
      </div>

      {/* Description Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={newIssue.description}
          onChange={handleChange}
          placeholder="Enter issue description"
          rows="4"
          className="w-full px-4 py-2 border border-[var(--primary-color)] rounded"
        />
      </div>

      {/* Counter Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="counter">
          Counter
        </label>
        <input
          type="number"
          name="counter"
          id="counter"
          value={newIssue.counter}
          onChange={handleChange}
          placeholder="Enter counter value"
          className="w-full px-4 py-2 border border-[var(--primary-color)] rounded"
        />
      </div>

      {/* Status Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="issueStatus">
          Status
        </label>
        <input
          type="text"
          name="issueStatus"
          id="issueStatus"
          value={newIssue.issueStatus}
          onChange={handleChange}
          placeholder="Enter issue status"
          className="w-full px-4 py-2 border border-[var(--primary-color)] rounded"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[var(--primary-color)] text-white py-2 px-4 rounded-md hover:bg-opacity-90"
      >
        Add
      </button>
    </div>
  );
};

export default AddIssue;
