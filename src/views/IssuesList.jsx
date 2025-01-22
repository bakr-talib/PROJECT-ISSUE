import React, { useEffect, useState } from "react";

const IssuesListView = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // استدعاء API لجلب القضايا
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/issues");
        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }
        const data = await response.json();
        setIssues(data.data); // الوصول إلى البيانات داخل خاصية 'data'
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <div className="text-center text-blue-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Issues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold mb-2 text-blue-600">
              {issue.title || "Untitled"}
            </h2>
            <p className="text-gray-700 mb-4">
              {issue.description || "No description provided"}
            </p>
            {issue.imageUrl && (
              <img
                src={issue.imageUrl}
                alt="Issue related"
                className="w-full h-auto rounded-lg mb-4"
              />
            )}
            <div className="text-sm text-gray-500 mb-2">
              <p>Created at: {new Date(issue.createdAt).toLocaleDateString()}</p>
              <p>Published at: {new Date(issue.publishedAt).toLocaleDateString()}</p>
            </div>
            {issue.username && (
              <div className="text-sm text-gray-500 mb-2">
                <p>Username: {issue.username}</p>
              </div>
            )}
            {issue.issueStatus && (
              <div className="text-sm text-gray-500">
                <p>Status: {issue.issueStatus}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesListView;
