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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow mx-auto max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex flex-col">
      <a>
        <img
          className="w-full object-cover rounded-t-lg h-48 sm:h-52 md:h-56 lg:h-64 xl:h-72"
          src={photoURL}
          alt=""
        />
      </a>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <a>
          <h5 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        {/* 
        Using flex-grow on the paragraph ensures that the description area takes up remaining space,
        pushing the bottom action section to the end of the card.
        Optionally, you can also add a class like `line-clamp-3` (with the Tailwind line-clamp plugin)
        if you want to restrict very long text.
      */}
        <p className="mb-3 text-sm sm:text-base md:text-lg font-normal text-gray-700 dark:text-gray-400 flex-grow">
          {description}
        </p>
      </div>
      <div className="px-4 sm:px-5 md:px-6 py-4 flex flex-col sm:flex-row gap-4">
        <button className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {dbDate > today ? "Ongoing" : "Closed"}
        </button>
        <Link
          to={`/viewdata/${session._id}`}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Card;
