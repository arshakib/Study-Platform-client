import { useContext } from "react";

import { AuthContext } from "../../Context/Context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CreateSession = () => {
  const { user } = useContext(AuthContext);

  const handelSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const tutorName = form.tutorName.value;
    const tutorEmail = form.tutorEmail.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
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
    const registrationFee = parseInt(form.registrationFee.value);
    const status = form.status.value;

    // console.log(session);
    // console.log(
    //   new Date(session.registrationStartDate).toISOString().split("T")[0]
    // );

    if (registrationStartDate > registrationEndDate) {
      toast.error(
        "Registration Start Date cannot be after Registration End Date",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=90e8400173b8e420a6134c2a5baa3d33`,
      formData
    );

    const session = {
      title,
      tutorName,
      tutorEmail,
      photoURL: data?.data?.url,
      registrationStartDate,
      registrationEndDate,
      classStartDate,
      classEndDate,
      duration,
      description,
      registrationFee,
      status,
    };

    try {
      axios.post("http://localhost:5000/sessions", session).then((res) => {
        if (res.data.insertedId) {
          toast.success("Session Created Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg z-30">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Session</h1>
      <form onSubmit={handelSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Session Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tutor Name
          </label>
          <input
            type="text"
            name="tutorName"
            value={user?.displayName}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tutor Email
          </label>
          <input
            type="text"
            name="tutorEmail"
            value={user?.email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Session Description
          </label>
          <textarea
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Upload Cover Photo
          </label>
          <input
            name="image"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Registration Start Date
          </label>
          <input
            type="date"
            name="registrationStartDate"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Registration Fee
          </label>
          <input
            type="text"
            name="registrationFee"
            value="0"
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Status
          </label>
          <input
            type="text"
            name="status"
            value="pending"
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSession;
