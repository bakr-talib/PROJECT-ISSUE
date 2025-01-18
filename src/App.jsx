import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ContentSwitcher from "./components/ContentSwitcher";

const App = () => {
  const [activeView, setActiveView] = useState('login'); // الصفحة الافتراضية هي تسجيل الدخول

  return (
    <div className=' w-screen h-screen bg-slate-500 grid  grid-rows-[70px_1fr_100px] '>

     <div className='' > <Navbar  changeView={setActiveView} /></div>

      <div className=''>
        <ContentSwitcher className="" activeView={activeView} />
      </div>

      <div className='flex justify-center items-center bg-slate-700 w-screen h-full'>footer</div>
    </div>
  );
};

export default App;
