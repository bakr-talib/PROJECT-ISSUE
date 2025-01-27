import React, { useState } from "react";
import userImg from "../assets/user.png";
import searchImg from "../assets/search.png";
import errorImg from "../assets/error.png"; 

const Header = ({setActiveContent}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev);
  };
  

  return (
    <header className="bg-[var(--primary-color)] p-4 shadow-md w-screen h-20 flex items-center justify-around rounded-bl-3xl rounded-br-3xl border-b-2 border-[#ffffff20] md:rounded-none md:shadow-none">
      {isSearchActive ? (
        <div className="w-full flex items-center justify-center">
          <div className="relative w-3/4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <img
              src={searchImg}
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
          <button
            onClick={toggleSearch}
            className="ml-2 p-2 hover:bg-gray-300 rounded-md"
          >
            <img
              src={errorImg}
              alt="cancel"
              className="w-6 h-6" // تعيين حجم الصورة
            />
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">ISSUES</h1>
          <div className="flex flex-row justify-end items-center w-32 h-6 relative">
            <button onClick={toggleSearch}>
              <img src={searchImg} alt="search" className="w-6 mx-5" />
            </button>
            <button onClick={toggleDropdown}>
              <img src={userImg} alt="account" className="w-6" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md p-2 w-32 z-10">
                <button
                onClick={() => setActiveContent("singup")}
                className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded">
                  Sign Up
                </button>
                <button
                onClick={() => setActiveContent("login")}
                className="block w-full text-left px-2 py-1 hover:bg-gray-200 rounded">
                  Login
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
