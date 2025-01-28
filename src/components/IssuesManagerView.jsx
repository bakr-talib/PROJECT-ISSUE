import React from "react";
import addImage from "../assets/add.png";
import editingImage from "../assets/editing.png";
import deleteImage from "../assets/trash.png";
import reviewImage from "../assets/review.png";

const IssuesManager = ({ setActiveContent }) => {
  return (
    <div className="flex flex-row  justify-evenly items-center rounded-tl-xl rounded-tr-xl md:flex-col md:order-2 md:w-20 md:rounded-none bg-[var(--translucent-color)]">
      <button onClick={() => setActiveContent("view")}>
        <img className="w-8" src={reviewImage} alt="Review" />
      </button>
      <button onClick={() => setActiveContent("add")}>
        <img className="w-8" src={addImage} alt="Add" />
      </button>
      <button onClick={() => setActiveContent("edit")}>
        <img className="w-8" src={editingImage} alt="Edit" />
      </button>
      <button onClick={() => setActiveContent("delete")}>
        <img className="w-8" src={deleteImage} alt="Delete" />
      </button>
    </div>
  );
};

export default IssuesManager;
