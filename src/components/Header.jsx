import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-[1280px] flex flex-wrap items-center justify-between mx-auto py-4 px-4">
        <Link to={"/"} className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Blog
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`w-full md:block md:w-auto ${isOpen ? "block" : "hidden"}`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-[20px] mt-4 md:mt-0">
            <li>
              <NavLink to="/" className="text-gray-700 dark:text-white ">
                Bosh Sahifa
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" className="text-gray-700 dark:text-white ">
                Maqola qo'shish
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
