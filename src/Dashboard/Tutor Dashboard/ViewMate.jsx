import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DeleteModal from "./DeleteModal";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";

const ViewMate = () => {
  const { user } = useContext(AuthContext);
  const {
    data: material = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/materials/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5000/materials/${id}`)
        .then(() => {
          refetch();
          console.log("Material deleted successfully");
          toast.success("Material Deleted Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.error("Error deleting material:", error);
          toast.error("Failed to delete material. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-full">
      <ToastContainer />
      {material.length > 0 ? (
        <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 w-11/12 mx-auto">
          {material.map((item) => (
            <div
              key={item.sessionId}
              className="card bg-base-100 shadow-xl w-full max-w-sm mx-auto"
            >
              {/* Image Section */}
              <figure className="px-6 pt-6">
                <img
                  src={item?.materialimage}
                  alt="Material"
                  className="rounded-xl w-full h-40 object-cover"
                />
              </figure>

              {/* Card Content */}
              <div className="card-body text-center">
                <p className="font-semibold">Session ID: {item?.sessionId}</p>
                <p className="text-sm break-words">
                  <span className="font-medium">Material Img Link:</span>{" "}
                  {item?.materialimage}
                </p>
                <p className="text-sm break-words">
                  <span className="font-medium">Material Link:</span>{" "}
                  {item?.link}
                </p>

                {/* Buttons */}
                <div className="card-actions flex flex-wrap justify-center gap-2 mt-4">
                  <button
                    className="btn btn-secondary w-full sm:w-auto"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Delete Modal */}
              <DeleteModal item={item} refetch={refetch} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center my-10 text-lg font-semibold text-gray-500">
          No materials available.
        </div>
      )}
    </div>
  );
};

export default ViewMate;
