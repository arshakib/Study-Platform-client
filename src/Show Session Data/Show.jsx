import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

/* eslint-disable react/prop-types */
const Show = () => {
  const id = useParams();
  const { user } = useContext(AuthContext);

  const { data: sessionData = [] } = useQuery({
    queryKey: ["length"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/onesessions/${id.id}`
      );
      return data;
    },
  });

  const { data: userData = [] } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      return data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/reviews/${id.id}`
      );
      return data;
    },
  });
  const calculateAverageRating = (reviews) => {
    if (!reviews.length) return 0;
    const totalRating = reviews.reduce(
      (sum, review) => sum + parseFloat(review.rating),
      0
    );
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating(reviews);

  const paymentInfo = {
    bookedsessionId: sessionData?._id,
    studentId: user?.email,
    studentName: user?.displayName,
    tutorEmail: sessionData?.tutorEmail,
  };

  const freeSession = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/payment",
        paymentInfo
      );
      toast.success("Booking successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(data);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const {
    title,
    description,
    tutorName,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    duration,
    registrationFee,
  } = sessionData;

  const dbDate = new Date(registrationEndDate);
  const today = new Date();

  return (
    <div className="my-10">
      <ToastContainer />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          {title}
        </h1>

        <div className="mb-4">
          <p className="text-base sm:text-lg text-gray-700">
            <strong>Tutor Name:</strong> {tutorName}
          </p>
          <p className="text-base sm:text-lg text-gray-700">
            <strong>Average Rating:</strong> {averageRating} / 5
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-600">
            <strong>Description:</strong> {description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="text-gray-700">
            <p className="text-sm sm:text-base">
              <strong>Registration Start:</strong>{" "}
              {new Date(registrationStartDate).toLocaleDateString()}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Registration End:</strong>{" "}
              {new Date(registrationEndDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-gray-700">
            <p className="text-sm sm:text-base">
              <strong>Class Start Time:</strong>{" "}
              {new Date(classStartDate).toLocaleString()}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Class End Date:</strong>{" "}
              {new Date(classEndDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-700">
            <strong>Session Duration:</strong> {duration} hours
          </p>
          <p className="text-sm sm:text-base text-gray-700">
            <strong>Registration Fee:</strong>{" "}
            {registrationFee === 0 ? "Free" : `$${registrationFee}`}
          </p>
        </div>

        <div>
          {dbDate > today ? (
            registrationFee == 0 ? (
              <Link
                disabled={userData?.role !== "student"}
                onClick={freeSession}
                className="w-full bg-blue-500 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-blue-600"
              >
                Book This Free Session Now
              </Link>
            ) : (
              <Link
                disabled={userData?.role !== "student"}
                to={`/payment/${id.id}`}
                className="w-full bg-blue-500 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-blue-600"
              >
                Book Now
              </Link>
            )
          ) : (
            <button
              className="w-full bg-gray-400 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg cursor-not-allowed"
              disabled
            >
              Registration Closed
            </button>
          )}
        </div>

        <div className="mb-4 mt-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            Reviews
          </h2>
          {reviews.length > 0 ? (
            <ul className="space-y-2">
              {reviews.map((review, index) => (
                <li key={index} className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                  <p className="text-sm sm:text-base text-gray-700">
                    {review?.review}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm sm:text-base text-gray-600">
              No reviews available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Show;
