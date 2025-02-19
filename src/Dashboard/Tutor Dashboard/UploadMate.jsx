import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const UploadMate = () => {
  const { user } = useContext(AuthContext);
  const { data: session = [], isLoading } = useQuery({
    queryKey: ["session", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/sessions/${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const form = event.target;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const link = form.link.value;

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=90e8400173b8e420a6134c2a5baa3d33`,
      formData
    );

    const materialData = {
      email: user?.email,
      sessionId: id,
      materialimage: data?.data?.url,
      link: link,
      isSubmitted: true,
    };

    try {
      axios
        .post("http://localhost:5000/materials", materialData)
        .then((res) => {
          if (res.data.insertedId) {
            toast.success("Material Uploaded Successfully", {
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
          toast.error("Material already exists", {
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
      console.log(error.response?.data.message || error.message);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="w-full">
      <ToastContainer />

      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-11/12 mx-auto">
        {session.map((session) => (
          <div
            key={session._id}
            className="card card-compact bg-base-100 shadow-xl w-full max-w-sm mx-auto"
          >
            <form onSubmit={(event) => handleSubmit(event, session._id)}>
              <figure>
                <img
                  src={session?.photoURL || ""}
                  alt="Session"
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg sm:text-xl">
                  {session?.title}
                </h2>
                <p className="text-sm text-gray-600">
                  Study session ID: {session?._id}
                </p>
                <p className="text-sm text-gray-600">
                  Tutor email: {session?.tutorEmail}
                </p>

                {/* File Upload */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-sm sm:text-base">
                      Pick a file
                    </span>
                  </div>
                  <input
                    type="file"
                    name="image"
                    required
                    className="file-input file-input-bordered w-full"
                  />
                </label>

                {/* Upload Materials Link */}
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text text-sm sm:text-base">
                      Upload Materials Link
                    </span>
                  </div>
                  <input
                    type="text"
                    name="link"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </label>

                {/* Upload Button */}
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary w-full sm:w-auto">
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadMate;
