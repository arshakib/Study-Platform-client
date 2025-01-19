import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewSession = () => {
  const id = useParams();

  const { data: sessionData = [] } = useQuery({
    queryKey: ["length"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/onesessions/${id.id}`
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

  return (
    <div className="my-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>

        <div className="mb-4">
          <p className="text-lg text-gray-700">
            <strong>Tutor Name:</strong> {tutorName}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Average Rating:</strong> {averageRating} / 5
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            <strong>Description:</strong> {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-gray-700">
            <p>
              <strong>Registration Start:</strong>{" "}
              {new Date(registrationStartDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Registration End:</strong>{" "}
              {new Date(registrationEndDate).toLocaleDateString()}
            </p>
          </div>
          <div className="text-gray-700">
            <p>
              <strong>Class Start Time:</strong>{" "}
              {new Date(classStartDate).toLocaleString()}
            </p>
            <p>
              <strong>Class End Date:</strong>{" "}
              {new Date(classEndDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Session Duration:</strong> {duration} hours
          </p>
          <p className="text-gray-700">
            <strong>Registration Fee:</strong>
            {registrationFee === 0 ? "Free" : `$${registrationFee}`}
          </p>
        </div>

        <div className="mb-4 mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Reviews</h2>
          {reviews.length > 0 ? (
            <ul className="space-y-2">
              {reviews.map((review, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-gray-700">{review?.review}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSession;
