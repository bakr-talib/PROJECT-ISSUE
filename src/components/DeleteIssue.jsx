import React, { useState, useEffect } from "react";

const DeleteIssue = () => {
  const [issues, setIssues] = useState([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch issues from API
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/issues");
        if (!response.ok) throw new Error("Failed to fetch issues");
        const data = await response.json();
        setIssues(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const handleCheckboxChange = (documentId) => {
    setSelectedDocumentIds((prevIds) =>
      prevIds.includes(documentId)
        ? prevIds.filter((id) => id !== documentId)
        : [...prevIds, documentId]
    );
  };

  const handleDelete = async () => {
    try {
      const deleteRequests = selectedDocumentIds.map((documentId) =>
        fetch(`http://localhost:1337/api/issues/${documentId}`, {
          method: "DELETE",
        })
      );

      await Promise.all(deleteRequests);

      setIssues(issues.filter((issue) => !selectedDocumentIds.includes(issue.documentId)));
      setSelectedDocumentIds([]);
      setSelectAll(false);
      alert("Selected issues deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  // Select/Deselect all items
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedDocumentIds([]); // Deselect all
    } else {
      setSelectedDocumentIds(issues.map((issue) => issue.documentId)); // Select all
    }
    setSelectAll(!selectAll);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="overflow-scroll scrollbar-hide w-9/12 mt-10 p-5 border-2 border-[var(--contrasting-color)] backdrop-blur-[2px] rounded-lg shadow-lg">
      <div className="flex justify-between items-center  mb-4">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)]">
          Delete Issues
        </h2>
        <div className="flex items-center">
          <label className="text-[var(--primary-color)] font-medium mr-2">
            Select All
          </label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="accent-[var(--primary-color)]"
          />
        </div>
      </div>

      {issues.length > 0 ? (
        <div className="flex flex-wrap gap-4 h-80">
          {issues.map((issue) => (
            <div
              key={issue.documentId}
              className="bg-[var(--background-color)] h-36 max-h- p-4 rounded-lg shadow-lg flex flex-col justify-between border border-[var(--primary-color)]"
            >
              <div>
                <h3 className="text-xl font-semibold text-[var(--primary-color)] truncate">
                  {issue.title}
                </h3>
                <p className="text-gray-600 truncate">{issue.description}</p>
                <p className="text-gray-800 font-medium">
                  Counter: {issue.counter ?? "N/A"}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    issue.issueStatus ? "text-green-600" : "text-red-500"
                  }`}
                >
                  Status: {issue.issueStatus ?? "N/A"}
                </p>
              </div>
              <input
                type="checkbox"
                checked={selectedDocumentIds.includes(issue.documentId)}
                onChange={() => handleCheckboxChange(issue.documentId)}
                className="mt-2 accent-[var(--primary-color)] self-end"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No issues to display</p>
      )}

      <button
        onClick={handleDelete}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 w-full disabled:opacity-50"
        disabled={selectedDocumentIds.length === 0}
      >
        Delete Selected
      </button>
    </div>
  );
};

export default DeleteIssue;
