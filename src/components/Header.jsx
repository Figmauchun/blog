import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-[1280px] flex flex-wrap items-center justify-between mx-auto py-4">
          <Link
            to={"/"}
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8"
              alt="Flowbite Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Blog
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class=" flex items-center justify-center my-[20px] md:my-[0] gap-[20px]">
              <li>
                <NavLink to={"/"} aria-current="page">
                  Bosh Sahifa
                </NavLink>
              </li>
              <li>
                <NavLink to={"/add"} aria-current="page">
                  Maqola qo'shish
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
