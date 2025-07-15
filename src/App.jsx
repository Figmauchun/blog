import React from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";

function App() {
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
