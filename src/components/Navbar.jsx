import React from 'react';

const Navbar = ({ changeView }) => {
  const styleButton ="border px-3  py-1 rounded-lg";
  return (
    <nav className='w-screen flex justify-around px-10 items-center space-x-1 h-full bg-slate-700'>
      <button className={styleButton} onClick={() => changeView('login')}>Login</button>
      <button className={styleButton} onClick={() => changeView('register')}>Register</button>
      <button className={styleButton} onClick={() => changeView('issues')}>Issues</button>
      <button className={styleButton} onClick={() => changeView('add-issue')}>Add Issue</button>
      <button className={styleButton} onClick={() => changeView('settings')}>Settings</button>
      <button className={styleButton} onClick={() => changeView('themes')}>Themes</button>
      <button className={styleButton} onClick={() => changeView('edit-issue')}>Edit</button>
    </nav>
  );
};

export default Navbar;
