import { useState, useEffect } from 'react';

const EditIssue = () => {
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:1337/api/issues');
      const result = await response.json();
      setData(result.data);
    };
    fetchData();
  }, []);

  // اختيار الكرت عند النقر عليه
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setTitle(card.title);
    setDescription(card.description);
  };

  // تعديل العنوان والوصف
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCard) return;

    // استخراج documentId وأيضًا التأكد من وجوده
    const { documentId } = selectedCard;
    if (!documentId) {
      alert('documentId غير موجود!');
      return;
    }

    const updatedCard = {
      ...selectedCard,
      title,
      description,
    };

    const response = await fetch(`http://localhost:1337/api/issues/${documentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCard),
    });

    if (response.ok) {
      const updatedData = data.map((item) =>
        item.documentId === documentId ? updatedCard : item
      );
      setData(updatedData);
      alert('تم التعديل بنجاح!');
    } else {
      alert('فشل التعديل!');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      {/* فورم التعديل */}
      <form className="w-full max-w-lg p-4 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">تعديل العنوان والوصف</h2>
        <div className="mb-4">
          <label className="block text-gray-700">العنوان</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="أدخل العنوان"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">الوصف</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="أدخل الوصف"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          تعديل
        </button>
      </form>

      {/* عرض الكروت */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full overflow-scroll h-60">
        {data.map((card) => (
          <div
            key={card.documentId} // استخدام documentId بدلاً من id
            className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
            onClick={() => handleCardClick(card)}
          >
            <h3 className="text-lg font-bold truncate">{card.title}</h3>
            <p className="text-sm text-gray-600 truncate">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditIssue;
