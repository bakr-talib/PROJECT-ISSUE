import React, { useState, useEffect } from "react";

const DeleteIssue = () => {
  const [issues, setIssues] = useState([]);
  const [selectedDocumentIds, setSelectedDocumentIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب البيانات من API
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/issues");
        if (!response.ok) throw new Error("Failed to fetch issues");
        const data = await response.json();
        setIssues(data.data || []);  // افترض أن البيانات تحتوي على `data`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  // تغيير حالة checkbox
  const handleCheckboxChange = (documentId) => {
    setSelectedDocumentIds((prevIds) =>
      prevIds.includes(documentId)
        ? prevIds.filter((itemDocumentId) => itemDocumentId !== documentId) // إذا كان موجوداً من قبل، قم بإزالته
        : [...prevIds, documentId] // إذا لم يكن موجوداً، أضفه
    );
  };

  // حذف الكروت المحددة من الـ API
  const handleDelete = async () => {
    try {
      // تنفيذ عملية حذف لكل كرت
      const deleteRequests = selectedDocumentIds.map((documentId) =>
        fetch(`http://localhost:1337/api/issues/${documentId}`, {
          method: "DELETE",
        })
      );

      // انتظار إتمام جميع عمليات الحذف
      await Promise.all(deleteRequests);

      // تحديث الواجهة بعد الحذف
      setIssues(issues.filter((issue) => !selectedDocumentIds.includes(issue.documentId))); // إزالة الكروت المحذوفة
      setSelectedDocumentIds([]); // إعادة تعيين الاختيارات
      alert("Selected issues deleted successfully!");
    } catch (err) {
      alert(err.message);
    }
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
    <div>
      <h2 className="text-2xl font-semibold mb-4">Delete Issues</h2>
      {issues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-scroll h-80">
          {issues.map((issue) => (
            <div
              key={issue.documentId}  // استخدمنا documentId هنا
              className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{issue.title}</h3>  {/* استخدمنا documentId هنا */}
                <p className="text-gray-600">{issue.description}</p>
              </div>
              <input
                type="checkbox"
                checked={selectedDocumentIds.includes(issue.documentId)}  // استخدمنا documentId هنا
                onChange={() => handleCheckboxChange(issue.documentId)}  // استخدمنا documentId هنا
                className="ml-4"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No issues to display</p>
      )}
      <button
        onClick={handleDelete}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Delete Selected
      </button>
    </div>
  );
};

export default DeleteIssue;
