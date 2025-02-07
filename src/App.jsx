import React, { useState, useEffect } from "react";
import AddIssue from "./components/AddIssue";
import DeleteIssue from "./components/DeleteIssue";
import IssuesList from "./components/IssuesList";
import EditIssue from "./components/EditIssue";
import Header from "./components/Header";
import IssuesManager from "./components/IssuesManagerView";
import Login from "./components/Login";
import SingUp from "./components/SingUp";
import themeImg from "./assets/theme.png";
import bgImage from "./assets/bg.png";
import { themes } from "./hooks/useTheme";

const App = () => {
  const [activeContent,  setActiveContent] = useState("login");
  const [showButtons, setShowButtons] = useState(false);
  const [theme, setTheme] = useState(themes.blue_dark);

  const handleThemeChange = (themeName) => {
    setTheme(themes[themeName]);
  };

  const toggleButtons = () => {
    setShowButtons((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", theme.primary);
    document.documentElement.style.setProperty("--secondary-color", theme.secondary);
    document.documentElement.style.setProperty("--background-color", theme.background);
    document.documentElement.style.setProperty("--contrasting-color", theme.contrasting);
    document.documentElement.style.setProperty("--translucent-color", theme.primary_translucent);
  }, [theme]);

  let compContBt;
  switch (activeContent) {
    case "add":
      compContBt = <AddIssue />;
      break;
    case "delete":
      compContBt = <DeleteIssue />;
      break;
    case "view":
      compContBt = <IssuesList />;
      break;
    case "edit":
      compContBt = <EditIssue />;
      break;
    case "singup":
      compContBt = <SingUp />;
      break;
    default:
      compContBt = <Login />;
  }

  return (
    <>

      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="w-screen bg-[var(--background-color)] h-screen grid grid-rows-[80px_1fr_50px] md:grid-rows-[80px_1fr] md:grid-cols-[40px_1fr] transition-all duration-500 text-[var(--contrasting-color)]"
      >
        {/* زر تغيير الثيم */}
        <div className="z-10 absolute right-5 top-24">
          <button
            className="border p-1 rounded-full bg-gradient-to-br from-pink-400 via-gray-400 to-yellow-400"
            style={{ background: 'linear-gradient(45deg, pink, gray, yellow, blue, green)' }}
            onClick={toggleButtons}
          >
            <img className="w-10" src={themeImg} alt="" />
          </button>

          {showButtons && (
            <div className="absolute space-y-2">
              <button
                onClick={() => handleThemeChange("Pink_dark")}
                className="border bg-[#2F1c35] absolute -top-16 right-2 w-7 h-7 rounded-full bg-transparent"
              ></button>
              <button
                onClick={() => handleThemeChange("Silver_dark")}
                className="border bg-[#6C6e71] absolute -top-10 right-4 w-7 h-7 rounded-full bg-transparent"
              ></button>
              <button
                onClick={() => handleThemeChange("Green_dark")}
                className="border bg-[#2D6a4f] absolute -top-2 right-1 w-7 h-7 rounded-full bg-transparent"
              ></button>
              <button
                onClick={() => handleThemeChange("blue_dark")}
                className="border bg-[#0F1933] absolute top-2 -right-7 w-7 h-7 rounded-full bg-transparent"
              ></button>
              <button
                onClick={() => handleThemeChange("Yellow_dark")}
                className="border bg-[#8a6b1F] absolute top-2 -right-16 w-7 h-7 rounded-full bg-transparent"
              ></button>
            </div>
          )}
        </div>

        {/* الهيدر */}
        <Header setActiveContent={setActiveContent} />

        {/* المحتوى الرئيسي */}
        <div className=" overflow-scroll  scrollbar-hide mt-10 text-[var(--primary-color)] flex justify-center items-center md:order-3">
          {compContBt}
        </div>

        {/* الفوتر */} 
        <IssuesManager setActiveContent={setActiveContent} />
      </div>
    </>
  );
};

export default App;
