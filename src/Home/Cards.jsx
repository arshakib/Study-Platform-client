/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";

const Cards = () => {
  const { data: number = {} } = useQuery({
    queryKey: ["length"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://study-ten-blond.vercel.app/sessionnumber"
      );
      return data;
    },
  });

  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sessionData, setSessionData] = useState([]);
  const item = 6;

  useEffect(() => {
    const totalItems = number?.count || 0;
    const numberofPages = Math.ceil(totalItems / item);
    setCount(numberofPages);
  }, [number?.count, item]);

  const pages = [...Array(count || 0).keys()];

  useEffect(() => {
    axios
      .get(
        `https://study-ten-blond.vercel.app/sessions?page=${currentPage}&size=${item}`
      )
      .then((res) => setSessionData(res.data));
  }, [currentPage, item]);

  return (
    <div>
      <div className="bg-blue-100 text-blue-800 font-bold text-center py-4 px-6 rounded-lg shadow-md text-lg sm:text-xl lg:text-2xl">
        ___On Going Session___
      </div>
      <div className="my-6 sm:my-8 lg:my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto">
        {sessionData.map((session) => (
          <Card key={session._id} session={session} />
        ))}
      </div>
      <div className="flex justify-center mt-6 sm:mt-8">
        <div className="join flex flex-wrap gap-2 justify-center">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`join-item btn ${
                page === currentPage ? "btn-active" : ""
              } px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-md`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
