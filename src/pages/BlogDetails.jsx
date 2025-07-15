import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-markdown-preview/markdown.css";
import Swal from "sweetalert2";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(`https://843fa6cd9b383ee2.mokky.dev/blogs/${id}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [id]);

  const DeleteItem = async () => {
    const { value: password } = await Swal.fire({
      title: "Shaxsni tasdiqlang",
      input: "password",
      inputLabel: "Parolni kiriting",
      inputPlaceholder: "Parol: hero1997....",
      showCancelButton: true,
      confirmButtonText: "Tasdiqlash",
      cancelButtonText: "Bekor qilish",
    });

    if (!password) return;

    if (password === "hero1997@#$") {
      await fetch(`https://843fa6cd9b383ee2.mokky.dev/blogs/${id}`, {
        method: "DELETE",
      });
      await Swal.fire(
        "O‘chirildi",
        "Blog muvaffaqiyatli o‘chirildi",
        "success"
      );
      window.location.assign("/");
    } else {
      Swal.fire("Xato!", "Parol noto‘g‘ri!", "error");
    }
  };

  const handleEdit = async () => {
    const { value: password } = await Swal.fire({
      title: "Tahrirlash uchun tasdiq",
      input: "password",
      inputLabel: "Parolni kiriting",
      inputPlaceholder: "Parol: hero1997@#$",
      showCancelButton: true,
      confirmButtonText: "Tasdiqlash",
      cancelButtonText: "Bekor qilish",
    });

    if (!password) return;

    if (password === "hero1997@#$") {
      navigate(`/edit/${id}`);
    } else {
      Swal.fire("Xato!", "Parol noto‘g‘ri!", "error");
    }
  };

  return (
    <div className="details px-[10px] lg:px-[15px]">
      <Link to={"/"} className="my-[20px] block">
        <span className="bg-blue-700 hover:bg-blue-600 cursor-pointer text-[#fff] p-[10px] rounded-[10px] flex items-center gap-[5px] w-fit ">
          <i className="bx bx-home-alt"></i>Ortga
        </span>
      </Link>

      {data && (
        <div className="details-box p-[15px] lg:p-[30px] ">
          <div className="category-box mb-[20px] flex justify-between items-center">
            <span className="bg-[#e1e1e1] text-[12px] rounded-[10px] px-[24px] py-[12px]">
              Kategoriya: {data.category}
            </span>
            <div className="flex gap-[10px]">
              <button
                onClick={handleEdit}
                className="bg-green-600 hover:bg-green-500 cursor-pointer text-white text-[16px] rounded-[10px] px-[18px] py-[12px]"
              >
                <i className="bx bxs-edit"></i>
              </button>

              <button
                onClick={DeleteItem}
                className="bg-[#d75252] hover:bg-[#d75252b8] cursor-pointer text-white text-[16px] rounded-[10px] px-[18px] py-[12px]"
              >
                <i className="bx bxs-trash"></i>
              </button>
            </div>
          </div>

          <div className="img-box">
            <img className="rounded-[20px]" src={data.image} alt="" />
          </div>

          <h4 className="text-[25px] my-[10px] lg:my-[30px]">{data.title}</h4>

          <div className="content-box text-[14px] lg:text-[16px]">
            <div data-color-mode="light">
              <MDEditor.Markdown source={data.description} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
