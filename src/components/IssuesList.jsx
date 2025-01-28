import React, { useState, useEffect } from "react";

const IssuesList = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-[var(--primary-color)]">
        <p className="text-lg font-semibold text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 border-2 border-[var(--contrasting-color)] backdrop-blur-[2px] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Issues List
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-scroll h-80">
        {issues.map((issue) => (
          <div
            key={issue.documentId}
            className="p-4 bg-[var(--primary-color)] text-[var(--contrasting-color)] rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">
              {issue.title}
            </h3>
            <p className="text-sm ">
              {issue.description || "No description available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesList;
