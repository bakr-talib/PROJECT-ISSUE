import { useState, useEffect } from "react";

const EditIssue = () => {
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [counter, setCounter] = useState("");
  const [issueStatus, setIssueStatus] = useState("");

  // جلب البيانات من الـ API عند تحميل المكون
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:1337/api/issues");
      const result = await response.json();
      setData(result.data);
    };
    fetchData();
  }, []);

  // عند النقر على بطاقة معينة نقوم بتعبئة الحقول في النموذج
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setTitle(card.title);
    setDescription(card.description);
    setCounter(card.counter);
    setIssueStatus(card.issueStatus);
  };

  // إرسال التعديل للـ API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCard) return;

    const { documentId } = selectedCard;
    if (!documentId) {
      alert("documentId غير موجود!");
      return;
    }

    const updatedCard = {
      ...selectedCard,
      title,
      description,
      counter,
      issueStatus,
    };

    const response = await fetch(`http://localhost:1337/api/issues/${documentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCard),
    });

    if (response.ok) {
      const updatedData = data.map((item) =>
        item.documentId === documentId ? updatedCard : item
      );
      setData(updatedData);
      alert("تم التعديل بنجاح!");
    } else {
      alert("فشل التعديل!");
    }
  };

  return (
    <div className="w-full overflow-y-scroll scrollbar-hide mt-24  ">
      {/* الحاوية الرئيسية */}
      <div className=" pt-14 flex flex-col justify-center  items-center gap-5 md:flex-row   ">
        {/* نموذج التعديل */}
        <form
          className="bg-[var(--background-color)] m-3 p-5 rounded-lg shadow-md border-2 border-[var(--contrasting-color)]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center mb-4 text-[var(--primary-color)]">
            تعديل البيانات
          </h2>
          <div className="mb-4">
            <label className="block text-[var(--primary-color)]">العنوان</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-[var(--primary-color)] rounded-md"
              placeholder="أدخل العنوان"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[var(--primary-color)]">الوصف</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-[var(--primary-color)] rounded-md"
              placeholder="أدخل الوصف"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[var(--primary-color)]">العداد</label>
            <input
              type="number"
              value={counter}
              onChange={(e) => setCounter(e.target.value)}
              className="w-full p-2 border border-[var(--primary-color)] rounded-md"
              placeholder="أدخل العداد"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[var(--primary-color)]">الحالة</label>
            <input
              type="text"
              value={issueStatus}
              onChange={(e) => setIssueStatus(e.target.value)}
              className="w-full p-2 border border-[var(--primary-color)] rounded-md"
              placeholder="أدخل الحالة"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--primary-color)] text-[var(--contrasting-color)] p-2 rounded-md hover:bg-opacity-90"
          >
            تعديل
          </button>
        </form>

        {/* عرض الكروت */}
        <div className=" w-11/12  md:w-2/5 lg:3/5 md:min-h-96 m-5 mt-10 self-start flex flex-wrap gap-4 backdrop-blur-[2px] p-4 border border-[var(--primary-color)]  rounded-2xl">
          {data.map((card) => (
            <div
              key={card.documentId}
              className="p-4 h-32 bg-[var(--background-color)] backdrop-blur-md bg-opacity-80 border border-[var(--primary-color)] rounded-lg shadow-md cursor-pointer hover:shadow-lg"
              onClick={() => handleCardClick(card)}
            >
              <h3 className="text-lg font-bold text-[var(--primary-color)] truncate">
                {card.title}
              </h3>
              <p className="text-sm text-[var(--secondary-color)] truncate">
                {card.description}
              </p>
              <p className="text-sm text-[var(--secondary-color)] truncate">
                العداد: {card.counter || "N/A"}
              </p>
              <p className="text-sm text-[var(--secondary-color)] truncate">
                الحالة: {card.issueStatus || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditIssue;
