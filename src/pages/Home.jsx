import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("https://843fa6cd9b383ee2.mokky.dev/blogs")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);
  return (
    <>
      <div className="home px-[15px]">
        <h2 className="text-[20px] md:text-[25px] lg:text-[35px] mb-[25px]">
          IT (Axborot texnologiyalari)ga oid maqolalar
        </h2>
        <div className="blog-cards-box grid sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {data &&
            data.map((e) => {
              return (
                <div class="bg-white cursor-pointer hover:translate-y-2 transition-all duration-150 ease-in-out border border-gray-200 rounded-lg shadow-sm">
                  <img
                    class="rounded-t-lg h-[220px] w-full  object-cover"
                    src={e.image}
                    alt=""
                  />

                  <div class="p-[20px]">
                    <h5 class="text-[20px]   font-bold tracking-tight text-gray-900 ">
                      {e.title}
                    </h5>

                    <p class="my-[15px] line-clamp-5 font-normal text-gray-700 dark:text-gray-400">
                      {e.description}
                    </p>
                    <Link
                      to={`/blog/${e.id}`}
                      class="inline-flex justify-between items-center px-3 py-2 text-sm font-medium text-center text-white w-full bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Batafsil
                      <svg
                        class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
