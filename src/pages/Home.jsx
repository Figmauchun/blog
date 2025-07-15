import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

function Home() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Hammasi");
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); // 👈 Nechta maqola ko‘rinadi

  useEffect(() => {
    fetch("https://843fa6cd9b383ee2.mokky.dev/blogs")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setFiltered(json);
        setCategories([
          "Hammasi",
          ...new Set(json.map((item) => item.category)),
        ]);
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    filterData();
    setVisibleCount(6); // 👈 Filtrlanganida boshidan boshlab ko‘rsatish
  }, [search, activeCategory]);

  const filterData = () => {
    let result = [...data];

    if (activeCategory !== "Hammasi") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (search.trim()) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="home px-[15px]">
      <h2 className="text-[20px] md:text-[25px] lg:text-[35px] mb-[25px]">
        IT (Axborot texnologiyalari)ga oid maqolalar
      </h2>

      <div className="filter-search flex flex-col md:flex-row justify-between md:items-center gap-4 mb-[25px]">
        <div className="btns-gruop flex flex-wrap gap-[10px]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-[10px] text-white ${
                activeCategory === category ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Maqola nomidan izlang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="blog-cards-box grid sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {load ? (
          <ClimbingBoxLoader />
        ) : filtered.length === 0 ? (
          <p className="text-gray-600 col-span-full">
            Hech qanday maqola topilmadi.
          </p>
        ) : (
          filtered.slice(0, visibleCount).map((e) => (
            <div
              key={e.id}
              className="bg-white cursor-pointer hover:translate-y-2 transition-all duration-150 ease-in-out border border-gray-200 rounded-lg shadow-sm"
            >
              <img
                className="rounded-t-lg h-[220px] w-full object-cover"
                src={e.image}
                alt={e.title}
              />
              <div className="p-[20px]">
                <p className="text-gray-500 mb-2">
                  O`qishlar soni 👁 {e.views ?? 0}
                </p>
                <h5 className="text-[20px] font-bold tracking-tight text-gray-900">
                  {e.title}
                </h5>
                <p className="my-[15px] line-clamp-5 font-normal text-gray-700">
                  {e.description}
                </p>
                <Link
                  to={`/blog/${e.id}`}
                  className="inline-flex justify-between items-center px-3 py-2 text-sm font-medium text-center text-white w-full bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                  Batafsil
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔽 Load More Button */}
      {!load && visibleCount < filtered.length && (
        <div className="flex justify-center mt-[30px]">
          <button
            onClick={handleLoadMore}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
          >
            Yana yuklash
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
