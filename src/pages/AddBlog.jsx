import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-markdown-preview/markdown.css";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const now = new Date();
  const createdAt = `${now.getDate().toString().padStart(2, "0")}.${(
    now.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${now.getFullYear()} ${now
    .getHours()
    .toString()
    .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !description || !imageBase64) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }
    const newPost = {
      title,
      category,
      description,
      image: imageBase64,
      createdAt,
      views,
    };

    fetch("https://843fa6cd9b383ee2.mokky.dev/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then(() => alert("Yuklandi"))
      .then(() => {
        window.location.assign("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="addpage px-[15px]">
      <h2 className="text-center md:text-left">Blog qo'shish sahifasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Maqola sarlavhasi</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="focus:ring-blue-500 focus:border-blue-500"
            placeholder="Maqola sarlavhasi"
            type="text"
          />
        </div>
        <div className="input-box">
          <label className="block mb-1">Kategoriyasi</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Kategoriya tanlang --</option>
            <option value="Kompyuter">Kompyuter</option>
            <option value="Tarmoq">Tarmoq</option>
            <option value="suniy intillekt">suniy intillekt</option>
            <option value="SCSS">SCSS</option>
            <option value="Kino">Kino</option>
            <option value="Dasturlash">Dasturlash</option>
            <option value="Frontend">Frontend</option>
          </select>
        </div>

        <div className="input-box">
          <label>Rasm yuklash</label>
          <input
            onChange={handleImageChange}
            className="focus:ring-blue-500 focus:border-blue-500"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="input-box">
          <label>Maqola mazmuni (Markdown editor)</label>
          <div data-color-mode="light">
            <MDEditor
              value={description}
              onChange={(value) => setDescription(value || "")}
              height={300}
              preview="edit"
            />
          </div>
        </div>

        {/* Markdown Preview qismi */}
        <div className="mt-5 p-4 border rounded bg-gray-50">
          <h3 className="text-md font-semibold mb-2">Markdown Preview:</h3>
          <div data-color-mode="light">
            <MDEditor.Markdown source={description} />
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-500 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
        >
          Maqola yuklash
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
