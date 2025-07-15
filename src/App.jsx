import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import ClipLoader from "react-spinners/ClipLoader"; // 🔄 Spinner
import { BounceLoader } from "react-spinners";

function App() {
  const [loading, setLoading] = useState(true); // Spinner holati

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // ⏱ 3 soniya

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4 bg-white">
        <BounceLoader color="#2563eb" size={60} />
        <h2 className="text-2xl font-semibold text-blue-700 animate-pulse">
          Xush kelibsiz!
        </h2>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add" element={<AddBlog />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path="edit/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
