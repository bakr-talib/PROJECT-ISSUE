import React from 'react';
import ThemeDropdown from './ThemeDropdown';
const NavBar = ({ setActiveView, setIsDropdownOpen, isDropdownOpen, themes, setCurrentTheme }) => {
  return (
    <nav
      className="w-60 h-full flex flex-col p-6 shadow-lg row-span-2"
      style={{ backgroundColor: 'var(--primary-color)', color: 'var(--tertiary-color)' }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">My App</h2>
      
      
      {['Login', 'IssuesManager', ].map(view => (
        <button
          key={view}
          onClick={() => setActiveView(view)}
          className="mb-3 p-3 text-lg font-semibold hover:bg-gray-300 hover:bg-opacity-10 rounded-lg transition duration-300"
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
      
      <hr />
      
      {/* القائمة المنسدلة للثيمات */}
      <ThemeDropdown 
        setIsDropdownOpen={setIsDropdownOpen} 
        isDropdownOpen={isDropdownOpen} 
        themes={themes}
        setCurrentTheme={setCurrentTheme} 
      />
    </nav>
  );
};

export default NavBar;
