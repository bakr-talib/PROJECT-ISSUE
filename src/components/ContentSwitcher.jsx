import React from 'react';

import IssuesManagerView from '../views/IssuesManagerView';
import Login from '../views/Login';

const ContentSwitcher = ({ activeView, currentTheme }) => {
  let content;
  switch (activeView) {
    case 'login':
      content = "<LoginView currentTheme={currentTheme} />";
      break;
    case 'IssuesManager':
      content = <IssuesManagerView />;
      break;
    case 'Login':
      content = <Login />;
      break;
   
      break;
    default:
      content = <div>Page not found</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col text-center" style={{ color: 'var(--primary-color)' }}>
      {content}
    </div>
  );
};

export default ContentSwitcher;
