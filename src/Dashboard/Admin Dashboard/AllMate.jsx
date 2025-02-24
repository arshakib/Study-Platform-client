import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AllMate = () => {
  const {
    data: material = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["material"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://study-ten-blond.vercel.app/materials`,
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
        .delete(`https://study-ten-blond.vercel.app/materials/${id}`)
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
    <div className="px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 w-full max-w-7xl mx-auto">
        {material.map((item) => (
          <div key={item?._id} className="card bg-base-100 shadow-xl">
            <figure className="px-5 pt-5">
              <img
                src={item?.materialimage}
                alt="Material"
                className="rounded-xl w-full h-40 object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <p className="text-sm font-semibold">
                Session Id: {item?.sessionId}
              </p>
              <p className="text-sm truncate w-11/12">
                Material Img: {item?.materialimage}
              </p>
              <p className="text-sm truncate w-11/12">
                Material Link: {item?.link}
              </p>
              <div className="card-actions">
                <button
                  onClick={() => handleDelete(item?._id)}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMate;
