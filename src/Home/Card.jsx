/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Card = ({ session }) => {
  const {
    title,

    description,

    photoURL,

    registrationEndDate,
  } = session;

  const dbDate = new Date(registrationEndDate);
  const today = new Date();

  return (
    <div className="max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between mx-auto">
      <div>
        <a>
          <img
            className="rounded-t-lg w-full object-cover h-40 md:h-52 lg:h-60"
            src={photoURL}
            alt=""
          />
        </a>
      </div>
      <div className="p-4 md:p-5">
        <a>
          <h5 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 text-sm md:text-base font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="w-full px-4 md:px-6 mb-5 mt-4 flex flex-col sm:flex-row justify-between gap-4">
        <a className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full sm:w-40">
          {dbDate > today ? "Ongoing" : "Closed"}
        </a>
        <Link
          to={`/viewdata/${session._id}`}
          className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full sm:w-40"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Card;
