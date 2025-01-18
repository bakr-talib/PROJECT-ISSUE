import React from 'react';
import LoginView from '../views/LoginView.jsx';
import RegisterView from '../views/RegisterView.jsx';
import IssuesListView from '../views/IssuesListView.jsx';
import AddIssueView from '../views/AddIssueView.jsx';
import EditIssueView from '../views/EditIssueView.jsx';
import SettingsView from '../views/SettingsView.jsx';
import ThemesView from '../views/ThemesView.jsx';
import ErrorView from '../views/ErrorView.jsx';

const ContentSwitcher = ({ activeView }) => {
  let content;
  
  switch (activeView) {
    case 'login':
      content = <LoginView />;
      break;
    case 'register':
      content = <RegisterView />;
      break;
    case 'issues':
      content = <IssuesListView />;
      break;
    case 'add-issue':
      content = <AddIssueView />;
      break;
    case 'edit-issue':
      content = <EditIssueView />;
      break;
    case 'settings':
      content = <SettingsView />;
      break;
    case 'themes':
      content = <ThemesView />;
      break;
    default:
      content = <ErrorView />;
      break;
  }
  
  return <div className='border-2 border-slate-700 flex justify-center items-center  mx-4 my-10 h-4/5 rounded-2xl'>{content}</div>;
};

export default ContentSwitcher;
