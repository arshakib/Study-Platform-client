import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/Context";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

const ViewBooked = () => {
  const id = useParams().id;
  const { user } = useContext(AuthContext);

  const { data: sessionData = [] } = useQuery({
    queryKey: ["viewbookeddata", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://study-ten-blond.vercel.app/onesessions/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });

  const {
    title,
    description,
    tutorName,
    rating,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    duration,
    registrationFee,
  } = sessionData;

  const handelreview = async (event) => {
    event.preventDefault();
    const form = event.target;
    const review = form.text.value;
    const rating = form.rating.value;
    const data = {
      review,
      rating,
      email: user?.email,
      name: user?.displayName,
      reviewSessionId: id,
    };

    try {
      await axios
        .post("https://study-ten-blond.vercel.app/collectreview", data)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Review Added Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }

          console.log(res.data);
        })
        .catch((error) =>
          console.error(error.response?.data.message || error.message)
        );
    } catch (error) {
      console.log(error.response?.data.message || error.message);
    }
  };
  return (
    <div>
      <ToastContainer />
      <div className="my-10">
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>

          <div className="mb-4">
            <p className="text-lg text-gray-700">
              <strong>Tutor Name:</strong> {tutorName}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Average Rating:</strong> {rating} / 5
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <strong>Description:</strong> {description}
            </p>
          </div>

          {/* Grid Layout for Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Give Some Reviews
            </h2>

            <form onSubmit={handelreview} className="space-y-4">
              <div>
                <label
                  htmlFor="reviewText"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Your Review
                </label>
                <textarea
                  id="reviewText"
                  name="text"
                  rows="4"
                  placeholder="Write your review here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="rating"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Rating
                </label>
                <select
                  id="rating"
                  name="rating"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="0" disabled>
                    Select a rating
                  </option>
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooked;
