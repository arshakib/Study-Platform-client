import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// eslint-disable-next-line react/prop-types
const NoteupModal = ({ refetch, notedata }) => {
  // eslint-disable-next-line react/prop-types
  const { _id, title, description } = notedata;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const updateData = {
      title: title,
      description: description,
    };

    axios
      .patch(`http://localhost:5000/notes/${_id}`, updateData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          refetch();
          toast.success("Note Updated Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error(error.response?.data.message || error.message);
      });
  };
  return (
    <div className="w-full">
      <ToastContainer />
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
          <form onSubmit={handleUpdate}>
            {/* Title Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                defaultValue={title}
                name="title"
                placeholder="Enter note title"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                defaultValue={description}
                name="description"
                placeholder="Enter note description"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                Create Note
              </button>
            </div>
          </form>

          {/* Close Button */}
          <div className="modal-action flex justify-center sm:justify-end">
            <form method="dialog">
              <button className="btn px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NoteupModal;
