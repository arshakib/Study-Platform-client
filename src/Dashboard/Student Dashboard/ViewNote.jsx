import { useContext, useState } from "react";
import { AuthContext } from "../../Context/Context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NoteupModal from "./NoteupModal";
import { toast, ToastContainer } from "react-toastify";

const ViewNote = () => {
  const { user } = useContext(AuthContext);
  const [notedata, setNoteData] = useState({});

  const {
    data: notes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["notes", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/notes/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });

  const datafn = (data) => {
    console.log(data);
    setNoteData(data);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/notes/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then(
        (res) => console.log(res.data),
        refetch(),
        toast.success("Note Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      )
      .catch((error) =>
        console.error(error.response?.data.message || error.message)
      );
    refetch();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-full mx-auto bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Manage Personal Notes
        </h2>

        {/* Notes Section */}
        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {note.title}
                </h3>
                <p className="text-gray-600 mt-2">{note.description}</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                  <button
                    onClick={() => {
                      document.getElementById("my_modal_3").showModal();
                      datafn(note);
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">
            No notes available. Start by creating some notes!
          </p>
        )}
      </div>
      <NoteupModal refetch={refetch} notedata={notedata} />
    </div>
  );
};

export default ViewNote;
