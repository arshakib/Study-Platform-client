import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import DeleteModal from "./DeleteModal";

const ViewMate = () => {
  const {
    data: material = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/materials`);
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
    <div>
      <div>
        <ToastContainer />
        <div className="my-10 grid grid-cols-3 gap-7 w-11/12 mx-auto">
          {material.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <div className="card bg-base-100 w-80 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={item?.materialimage}
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <p>Session Id: {item?.sessionId}</p>
                <p className="text-sm">
                  Material Img Link: {item?.materialimage}
                </p>
                <p className="text-sm"> Material Link: {item?.link}</p>
                <div className="card-actions">
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <DeleteModal item={item} refetch={refetch} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewMate;
