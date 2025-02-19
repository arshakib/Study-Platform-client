import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CreateNote = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const title = form.title.value;
    const description = form.description.value;
    const note = { email, title, description };

    try {
      axios.post("http://localhost:5000/notes", note).then((data) => {
        if (data.data.insertedId) {
          toast.success("Note Created Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          form.reset();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-8 w-full sm:w-[90%] md:w-[80%] lg:w-[50%]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user?.email}
              readOnly
              className="w-full px-4 py-3 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
            />
          </div>

          {/* Title Field */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter note title"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter note description"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-3 w-full sm:w-auto bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
