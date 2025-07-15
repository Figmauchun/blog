import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const questions = [
    { question: "const — bu nima?", answer: "o'zgarmas" },
    { question: "useState — nima vazifani bajaradi?", answer: "state" },
    { question: "img — bu nima?", answer: "rasm" },
    { question: "color — nima beradi?", answer: "rang" },
    { question: "[] — bu nima?", answer: "massiv" },
    { question: "Komponent — qanday harf bilan boshlanadi?", answer: "katta" },
    { question: "<!DOCTYPE> — bu nima?", answer: "boshlanish" },
    {
      question: "react-router-dom — nima uchun ishlatiladi?",
      answer: "routing",
    },
    { question: "margin — cssda nima beradi?", answer: "oraliq" },
    { question: "function — bu nima?", answer: "funksiya" },
  ];

  const handleQuizBeforeAdd = async () => {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];

    try {
      const { value: userAnswer } = await Swal.fire({
        title: "Savol:",
        input: "text",
        inputLabel: randomQuestion.question,
        inputPlaceholder: "Javobni kiriting...",
        showCancelButton: true,
        confirmButtonText: "Yuborish",
        cancelButtonText: "Bekor qilish",
        allowOutsideClick: true,
        allowEscapeKey: true,
      });

      if (!userAnswer) return;

      if (
        userAnswer.trim().toLowerCase() === randomQuestion.answer.toLowerCase()
      ) {
        await Swal.fire(
          "To‘g‘ri!",
          "Endi maqola qo‘shishingiz mumkin!",
          "success"
        );
        document.body.style.overflow = "auto"; // scrollni tiklash
        navigate("/add");
      } else {
        await Swal.fire(
          "Xato!",
          "Javob noto‘g‘ri. Qaytadan urinib ko‘ring.",
          "error"
        );
        document.body.style.overflow = "auto";
      }
    } catch (err) {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-[1280px] flex flex-wrap items-center justify-between mx-auto py-4 px-4">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/logo.png" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            IT Maqolalar
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
              <NavLink to="/" className="text-gray-700 dark:text-white">
                Bosh Sahifa
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleQuizBeforeAdd}
                className="text-gray-700 dark:text-white"
              >
                Maqola qo'shish
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
