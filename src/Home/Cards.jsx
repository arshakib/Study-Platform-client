import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";

const Cards = () => {
  const { data: number = [] } = useQuery({
    queryKey: ["length"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/sessionnumber`);
      return data;
    },
  });

  console.log(number?.count);
  const [currentPage, setCurrentPage] = useState(0);
  const [sessionData, setSessionData] = useState([]);
  const item = 6;
  const numberofPages = Math.ceil(11 / item);

  const pages = [...Array(numberofPages).keys()];

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/sessions`)
  //     .then((res) => setSessionData(res.data));
  // }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/sessions?page=${currentPage}&size=${item}`)
      .then((res) => setSessionData(res.data));
  }, [currentPage, item]);

  return (
    <div>
      <div className="bg-blue-100 text-blue-800 font-bold text-center py-4 px-6 rounded-lg shadow-md text-2xl">
        ___On Going Session___
      </div>
      <div className="my-10 grid grid-cols-3 gap-4 w-11/12 mx-auto">
        {sessionData.map((session) => (
          // eslint-disable-next-line react/jsx-key
          <Card key={session._id} session={session} />
        ))}
      </div>
      <div className="flex justify-center">
        <div className="join">
          {pages.map((page) => (
            // eslint-disable-next-line react/jsx-key
            <button
              onClick={() => setCurrentPage(page)}
              className={`join-item btn ${
                page === currentPage ? "btn-active" : ""
              }`}
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
