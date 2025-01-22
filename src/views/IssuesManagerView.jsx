import React, { useState, useEffect } from "react"; // استيراد المكونات اللازمة من مكتبة React
import AddIssue from "./AddIssue"; // استيراد مكون إضافة مشكلة
import IssuesList from "./IssuesList"; // استيراد مكون عرض قائمة المشاكل
import EditIssue from "./EditIssue"; // استيراد مكون تعديل مشكلة
import DeleteIssue from "./DeleteIssue"; // استيراد مكون حذف مشكلة

const IssuesManagerView = () => { // تعريف المكون الرئيسي لإدارة المشاكل
  const [issues, setIssues] = useState([]); // حالة لتخزين قائمة المشاكل
  const [loading, setLoading] = useState(true); // حالة لتحديد ما إذا كانت البيانات قيد التحميل
  const [error, setError] = useState(null); // حالة لتخزين الأخطاء إن وجدت
  const [activeComponent, setActiveComponent] = useState("list"); // حالة لتحديد المكون النشط

  // استدعاء البيانات من الخادم عند تحميل المكون
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/issues"); // جلب قائمة المشاكل من الخادم
        if (!response.ok) {
          throw new Error("Failed to fetch issues"); // إلقاء خطأ إذا حدثت مشكلة في الجلب
        }
        const data = await response.json(); // تحويل الاستجابة إلى JSON
        setIssues(data.data || []); // تحديث حالة قائمة المشاكل
      } catch (err) {
        setError(err.message); // تخزين رسالة الخطأ في حالة الخطأ
      } finally {
        setLoading(false); // تعيين حالة التحميل إلى false بعد انتهاء العملية
      }
    };

    fetchIssues(); // استدعاء الدالة لجلب المشاكل
  }, []);

  // دالة لإضافة مشكلة جديدة
  const handleAddIssue = async (newIssue) => {
    try {
      const response = await fetch("http://localhost:1337/api/issues", {
        method: "POST", // تحديد طريقة الإرسال POST
        headers: {
          "Content-Type": "application/json", // تحديد نوع المحتوى المرسل
        },
        body: JSON.stringify({ data: newIssue }), // تحويل البيانات إلى JSON قبل الإرسال
      });

      if (!response.ok) {
        throw new Error("Failed to add issue"); // إلقاء خطأ إذا حدثت مشكلة أثناء الإضافة
      }

      const result = await response.json(); // تحويل الاستجابة إلى JSON
      setIssues((prev) => [...prev, result.data]); // تحديث حالة قائمة المشاكل بإضافة المشكلة الجديدة
    } catch (err) {
      alert(err.message); // عرض رسالة الخطأ للمستخدم
    }
  };

  // دالة لحذف مشكلة
  const handleDeleteIssue = async (documentId) => {
    try {
      const response = await fetch(`http://localhost:1337/api/issues/${documentId}`, {
        method: "DELETE", // تحديد طريقة الإرسال DELETE
      });

      if (!response.ok) {
        throw new Error("Failed to delete issue"); // إلقاء خطأ إذا حدثت مشكلة أثناء الحذف
      }

      setIssues((prev) => prev.filter((issue) => issue.documentId !== documentId)); // تحديث حالة قائمة المشاكل بعد الحذف
    } catch (err) {
      alert(err.message); // عرض رسالة الخطأ للمستخدم
    }
  };

  // دالة لتعديل مشكلة
  const handleEditIssue = async (updatedIssue) => {
    try {
      const { documentId, title, description } = updatedIssue; // استخراج بيانات المشكلة المحدثة
      const response = await fetch(`http://localhost:1337/api/issues/${documentId}`, {
        method: "PUT", // تحديد طريقة الإرسال PUT
        headers: {
          "Content-Type": "application/json", // تحديد نوع المحتوى المرسل
        },
        body: JSON.stringify({ data: { title, description } }), // تحويل البيانات إلى JSON قبل الإرسال
      });

      if (!response.ok) {
        throw new Error("Failed to edit issue"); // إلقاء خطأ إذا حدثت مشكلة أثناء التعديل
      }

      const result = await response.json(); // تحويل الاستجابة إلى JSON
      setIssues((prev) =>
        prev.map((issue) =>
          issue.documentId === documentId ? { ...issue, ...result.data } : issue // تحديث المشكلة المعدلة في قائمة المشاكل
        )
      );
    } catch (err) {
      alert(err.message); // عرض رسالة الخطأ للمستخدم
    }
  };

  if (loading) {
    return <div className="text-center text-blue-500">Loading...</div>; // عرض رسالة تحميل إذا كانت البيانات قيد التحميل
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>; // عرض رسالة خطأ إذا حدثت مشكلة
  }

  return (
    <div className="container mx-auto p-4"> {/* حاوية رئيسية */}
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Issues</h1> {/* عنوان الصفحة */}

      {/* أزرار التنقل بين المكونات */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setActiveComponent("add")} // تعيين المكون النشط إلى إضافة مشكلة
        >
          Add Issue
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setActiveComponent("edit")} // تعيين المكون النشط إلى تعديل مشكلة
        >
          Edit Issue
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setActiveComponent("delete")} // تعيين المكون النشط إلى حذف مشكلة
        >
          Delete Issue
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setActiveComponent("list")} // تعيين المكون النشط إلى عرض قائمة المشاكل
        >
          View Issues
        </button>
      </div>

      {/* عرض المكون بناءً على الحالة النشطة */}
      {activeComponent === "add" && <AddIssue onAddIssue={handleAddIssue} />} {/* عرض مكون إضافة مشكلة */}
      {activeComponent === "edit" && <EditIssue onEditIssue={handleEditIssue} />} {/* عرض مكون تعديل مشكلة */}
      {activeComponent === "delete" && <DeleteIssue onDeleteIssue={handleDeleteIssue} />} {/* عرض مكون حذف مشكلة */}
      {activeComponent === "list" && <IssuesList issues={issues} onDeleteIssue={handleDeleteIssue} />} {/* عرض قائمة المشاكل */}
    </div>
  );
};

export default IssuesManagerView; // تصدير المكون الرئيسي
