import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import Swal from "sweetalert2";
import "@uiw/react-markdown-preview/markdown.css";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [description, setDescription] = useState("");

  // Ma'lumotlarni olish
  useEffect(() => {
    fetch(`https://843fa6cd9b383ee2.mokky.dev/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setCategory(data.category);
        setImageBase64(data.image);
        setDescription(data.description);
      })
      .catch((err) => {
        console.error("Ma'lumotni yuklashda xatolik:", err);
        Swal.fire("Xatolik", "Ma'lumotni yuklashda xatolik", "error");
      });
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      title,
      category,
      image: imageBase64,
      description,
    };

    try {
      const res = await fetch(
        `https://843fa6cd9b383ee2.mokky.dev/blogs/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Xatolik:", res.status, errorText);
        throw new Error("Serverdan muvaffaqiyatli javob olmadik");
      }

      await Swal.fire("Tahrirlandi!", "Ma'lumot yangilandi", "success");
      navigate("/");
    } catch (error) {
      console.error("PUT xatolik:", error);
      Swal.fire("Xatolik", "Yangilashda xatolik yuz berdi", "error");
    }
  };

  return (
    <div className="addpage px-[15px] py-[20px]">
      <h2 className="text-center md:text-left mb-4">Blogni tahrirlash</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box mb-4">
          <label>Maqola sarlavhasi</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Maqola sarlavhasi"
            type="text"
          />
        </div>
        <div className="input-box mb-4">
          <label>Kategoriyasi</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Kategoriya"
            type="text"
          />
        </div>
        <div className="input-box mb-4">
          <label>Rasm yuklash</label>
          <input
            onChange={handleImageChange}
            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            type="file"
            accept="image/*"
          />
        </div>
        {imageBase64 && (
          <img
            src={imageBase64}
            alt="Preview"
            className="w-full max-w-[300px] my-3 rounded"
          />
        )}
        <div className="input-box mb-4">
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
          Maqolani yangilash
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
