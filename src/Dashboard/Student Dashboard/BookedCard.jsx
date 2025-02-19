import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const BookedCard = ({ session }) => {
  const { bookedsessionId } = session;

  const { data: bookedData = [] } = useQuery({
    queryKey: ["bookedData", bookedsessionId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/bookedsessiondata/${bookedsessionId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });

  console.log(bookedData);

  const { title, description, photoURL, _id } = bookedData[0] || {};
  return (
    <div className="w-full">
      <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between mx-auto">
        {/* Image Section */}
        <div>
          <a>
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={photoURL}
              alt="Book"
            />
          </a>
        </div>

        {/* Content Section */}
        <div className="p-5 text-center">
          <a>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-wrap">
            {description}
          </p>
        </div>

        {/* Button Section */}
        <div className="w-full flex justify-center mb-5 mt-4">
          <Link
            to={`/viewbookeddata/${_id}`}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full sm:w-40"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookedCard;
