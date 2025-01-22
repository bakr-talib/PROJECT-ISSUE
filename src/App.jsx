import React, { useState, useEffect } from 'react';
import { themes } from './hooks/UseTheme'; 
import NavBar from './components/NavBar';
import ContentSwitcher from './components/ContentSwitcher';
import Footer from './components/Footer';

const App = () => {
  const [activeView, setActiveView] = useState('Login');
  const [currentTheme, setCurrentTheme] = useState(themes.Pink_dark);  // تغيير القيمة الافتراضية إلى Pink_dark
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // color type change 
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', currentTheme.primary);
    document.documentElement.style.setProperty('--secondary-color', currentTheme.secondary);
    document.documentElement.style.setProperty('--tertiary-color', currentTheme.background); // تعديل لتعيين اللون الخلفي
    document.documentElement.style.setProperty('--contrasting-color', currentTheme.contrasting); // إضافة للون المعاكس
  }, [currentTheme]);

  return (
    <div
      className="w-screen h-screen grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] transition-all duration-500"
      style={{ backgroundColor: 'var(--tertiary-color)', color: 'var(--primary-color)' }}
    >
      <NavBar 
        setActiveView={setActiveView} 
        setIsDropdownOpen={setIsDropdownOpen} 
        isDropdownOpen={isDropdownOpen} 
        themes={themes} 
        setCurrentTheme={setCurrentTheme} 
      />

      <ContentSwitcher activeView={activeView} currentTheme={currentTheme} />

      <Footer />
    </div>
  );
};

export default App;
