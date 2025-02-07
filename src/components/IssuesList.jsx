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
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">
        Issues List
      </h2>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-scroll scrollbar-hide h-80">
        {issues.map((issue) => (
          <div
            key={issue.documentId}
            className="p-4 h-40 bg-[var(--background-color)]  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
       
            {/* Title */}
            <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>

            {/* Description */}
            <p className="text-sm mb-2">
              {issue.description || "No description available."}
            </p>

            {/* Counter */}
            <p className="text-sm mb-2">
              {issue.counter !== null ? issue.counter : "No counter available."}
            </p>

            {/* Status */}
            <p className="text-sm">
              {issue.issueStatus || "No status available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesList;
