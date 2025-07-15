import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-markdown-preview/markdown.css";
function BlogDetails() {
  const { id } = useParams();
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(`https://843fa6cd9b383ee2.mokky.dev/blogs/${id}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  const DeleteItem = () => {
    fetch(`https://843fa6cd9b383ee2.mokky.dev/blogs/${id}`, {
      method: "DELETE",
    }).then(() => {
      alert("Blog o'chirildi");
      window.location.assign("/");
    });
  };
  return (
    <>
      <div className="details px-[10px] lg:px-[15px]">
        <Link to={"/"} className="my-[20px] block">
          <span className="bg-blue-700 hover:bg-blue-600 cursor-pointer text-[#fff] p-[10px] rounded-[10px] flex items-center gap-[5px] w-fit ">
            <i class="bx bx-home-alt"></i>Ortga
          </span>
        </Link>
        {data && (
          <div className="details-box p-[15px] lg:p-[30px] ">
            <div className="category-box mb-[20px] flex justify-between items-center">
              <span className=" bg-[#e1e1e1] text-[12px] rounded-[10px] px-[24px] py-[12px]">
                Kategory:{data.category}
              </span>
              <div
                onClick={DeleteItem}
                className="trash-box bg-[#d75252] hover:bg-[#d75252b8] cursor-pointer text-[#fff] text-[16px] rounded-[10px] px-[18px] py-[12px]"
              >
                <i class="bx bxs-trash"></i>
              </div>
            </div>
            <div className="img-box">
              <img className=" rounded-[20px]" src={data.image} alt="" />
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
    </>
  );
}

export default BlogDetails;
