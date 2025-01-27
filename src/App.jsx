import React, { useState, useEffect } from "react";
import AddIssue from "./components/AddIssue";
import DeleteIssue from "./components/DeleteIssue";
import IssuesList from "./components/IssuesList";
import EditIssue from "./components/EditIssue";
import Header from "./components/Header";
import IssuesManager from "./components/IssuesManagerView";
import Login from "./components/Login"
import SingUp from "./components/SingUp"

// استيراد مكون المنجر
// import { useTheme } from "./hooks/useTheme"; // تعديل المسار هنا

const App = () => {
  const [activeContent, setActiveContent] = useState("login");
  // const { theme, changeTheme } = useTheme(); // استخدام الهوك لتغيير الثيم
  // تغيير الألوان عند تغيير الثيم
  // useEffect(() => {
  //   document.documentElement.style.setProperty("--primary-color", theme.primary);
  //   document.documentElement.style.setProperty("--secondary-color", theme.secondary);
  //   document.documentElement.style.setProperty("--tertiary-color", theme.background);
  //   document.documentElement.style.setProperty("--contrasting-color", theme.contrasting);
  // }, [theme]);

  // اختيار المكون بناءً على الزر النشط
  let compContBt;
  switch (activeContent) {
    case "add":
      compContBt = <AddIssue  />;
      break;
    case "delete":
      compContBt = <DeleteIssue />;
      break;
    case "view":
      compContBt = <IssuesList  />;
      break;
    case "edit":
      compContBt = <EditIssue />;
      break;
        case "singup":
          compContBt = <SingUp />;
          break;
    default:
        compContBt = <Login/>;
  }

  return (<>
      <div className="w-screen bg-slate-400 h-screen grid grid-rows-[80px_1fr_50px] transition-all duration-500 text-[var(--contrasting-color)]">

       <Header setActiveContent={setActiveContent} />
      <div className="text-[var(--primary-color)] flex justify-center items-center">{compContBt}</div>
      <IssuesManager setActiveContent={setActiveContent} />
     </div> 
    </>
  );
};

export default App;
