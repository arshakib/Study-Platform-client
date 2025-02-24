/* eslint-disable react/prop-types */
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UpdateSession = () => {
  const id = useParams().id;
  console.log(id);
  const { data: sessionpreview = [] } = useQuery({
    queryKey: ["sessionpreview"],
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

  console.log(sessionpreview);

  const {
    title,
    registrationStartDate,
    registrationEndDate,
    classStartDate,
    classEndDate,
    duration,
    description,
  } = sessionpreview;

  const handelSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;

    const title = form.title.value;
    const registrationStartDate = new Date(form.registrationStartDate.value)
      .toISOString()
      .split("T")[0];
    const registrationEndDate = new Date(form.registrationEndDate.value)
      .toISOString()
      .split("T")[0];
    const classStartDate = new Date(form.classStartDate.value)
      .toISOString()
      .split("T")[0];
    const classEndDate = new Date(form.classEndDate.value)
      .toISOString()
      .split("T")[0];
    const duration = form.duration.value;
    const description = form.description.value;

    if (registrationStartDate > registrationEndDate) {
      toast.error(
        "Registration Start Date cannot be after Registration End Date",
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
      return;
    }

    const session = {
      title,
      registrationStartDate,
      registrationEndDate,
      classStartDate,
      classEndDate,
      duration,
      description,
    };

    try {
      const response = await axios.patch(
        `https://study-ten-blond.vercel.app/sessionsupdate/${id}`,
        session
      );

      if (response.data.modifiedCount) {
        toast.success("Session Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating session:", error);
      toast.error("Failed to update session!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <form onSubmit={handelSubmit}>
          <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <ToastContainer />
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create Session
            </h1>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Session Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={title}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Session Description
              </label>
              <textarea
                name="description"
                defaultValue={description}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Registration Start Date
              </label>
              <input
                type="date"
                name="registrationStartDate"
                value={registrationStartDate}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Registration End Date
              </label>
              <input
                type="date"
                name="registrationEndDate"
                value={registrationEndDate}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Class Start Date
              </label>
              <input
                type="date"
                name="classStartDate"
                defaultValue={classStartDate}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Class End Date
              </label>
              <input
                type="date"
                name="classEndDate"
                defaultValue={classEndDate}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Session Duration
              </label>
              <input
                type="text"
                name="duration"
                defaultValue={duration}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mt-6">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Update Session
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSession;
