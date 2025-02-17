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
        `http://localhost:5000/bookednumber/${user?.email}`
      );
      return data;
    },
  });

  console.log(number?.count);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sessionData, setSessionData] = useState([]);
  const item = 6;
  useEffect(() => {
    // Ensure `number?.count` is a valid number before calculating
    const totalItems = number?.count || 0; // Fallback to 0 if undefined
    const numberofPages = Math.ceil(totalItems / item); // Guard against NaN
    setCount(numberofPages);
  }, [number?.count, item]);

  const pages = [...Array(count || 0).keys()];

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/bookedsessions/${user?.email}?page=${currentPage}&size=${item}`,
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
