import React from "react";
import addImage from "../assets/add.png";
import editingImage from "../assets/editing.png";
import deleteImage from "../assets/trash.png";
import reviewImage from "../assets/review.png";

const IssuesManager = ({ setActiveContent }) => {
  return (
    <div className="flex flex-row justify-evenly bg-slate-500">
      <button onClick={() => setActiveContent("view")}>
        <img className="w-10" src={reviewImage} alt="Review" />
      </button>
      <button onClick={() => setActiveContent("add")}>
        <img className="w-10" src={addImage} alt="Add" />
      </button>
      <button onClick={() => setActiveContent("edit")}>
        <img className="w-10" src={editingImage} alt="Edit" />
      </button>
      <button onClick={() => setActiveContent("delete")}>
        <img className="w-10" src={deleteImage} alt="Delete" />
      </button>
    </div>
  );
};

export default IssuesManager;
