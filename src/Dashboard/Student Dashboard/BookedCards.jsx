/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Context";
import BookedCard from "./BookedCard";

const BookedCards = () => {
  const { user } = useContext(AuthContext);

  const { data: number = [] } = useQuery({
    queryKey: ["bookednumber"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://study-ten-blond.vercel.app/bookednumber/${user?.email}`
      );
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
  //     .get(`https://study-ten-blond.vercel.app/sessions`)
  //     .then((res) => setSessionData(res.data));
  // }, []);

  useEffect(() => {
    axios
      .get(
        `https://study-ten-blond.vercel.app/bookedsessions/${user?.email}?page=${currentPage}&size=${item}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then((res) => setSessionData(res.data));
  }, [currentPage, item, user?.email]);

  console.log(sessionData);
  return (
    <div>
      <div className="my-10 grid grid-cols-3 gap-4 w-11/12 mx-auto">
        {sessionData.map((session) => (
          <BookedCard key={session._id} session={session} />
        ))}
      </div>
      <div className="flex justify-center">
        <div className="join">
          {pages.map((page) => (
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

export default BookedCards;
