import React from 'react';

const ThemeDropdown = ({ setIsDropdownOpen, isDropdownOpen, themes, setCurrentTheme }) => {
  return (
    <div className="relative mt-2">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="mb-2 p-3 text-lg bg-gray-200 bg-opacity-10 font-semibold hover:bg-gray-400 hover:bg-opacity-10 rounded-lg transition duration-300 w-full text-left"
      >
        Themes
      </button>
      {isDropdownOpen && (
        <div className="absolute overflow-scroll left-0 mt-2 w-full bg-opacity-10 rounded-lg z-10">
          {Object.keys(themes).map((themeKey) => (
            <button
              key={themeKey}
              onClick={() => {
                setCurrentTheme(themes[themeKey]); 
                setIsDropdownOpen(false); // إغلاق القائمة عند اختيار الثيمة
              }}
              className="block w-full px-4 py-2 my-3 text-left bg-gray-100 bg-opacity-50 text-white hover:bg-gray-300 hover:bg-opacity-20 rounded-lg"
            >
              {themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
