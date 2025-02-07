import React, { useState, useEffect, useRef } from "react";
import userImg from "../assets/user.png";
import searchImg from "../assets/search.png";
import errorImg from "../assets/error.png";

const Header = ({ setActiveContent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[var(--translucent-color)] md:order-1 md:col-span-2 p-6 shadow-md w-full  flex items-center justify-around rounded-bl-3xl rounded-br-3xl border-b-2 border-[#ffffff20] md:rounded-none md:shadow-none">
      {isSearchActive ? (
        <div className="w-full flex items-center justify-center">
          <div className="relative w-3/4 md:w-1/2 lg:w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <img
              src={searchImg}
              alt="search"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
          </div>
          <button
            onClick={toggleSearch}
            className="ml-3 p-3 hover:bg-gray-300 rounded-md"
          >
            <img src={errorImg} alt="cancel" className="w-7 h-7" />
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">ISSUES</h1>
          <div className="flex flex-row justify-around items-center w-2/6 h-8 relative">
            <button onClick={toggleSearch}>
              <img src={searchImg} alt="search" className="w-8 mx-5" />
            </button>
            <button onClick={toggleDropdown}>
              <img src={userImg} alt="account" className="w-8" />
            </button>
            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute top-12 right-0 bg-[var(--primary-color)] shadow-lg rounded-md p-3 w-40 z-10">
                <button
                  onClick={() => setActiveContent("singup")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-200 rounded text-lg"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setActiveContent("login")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-200 rounded text-lg"
                >
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
