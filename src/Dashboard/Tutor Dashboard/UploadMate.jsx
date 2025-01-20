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
        `https://study-ten-blond.vercel.app/sessions/${user?.email}`,
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
        .post("https://study-ten-blond.vercel.app/materials", materialData)
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
    <div>
      <ToastContainer />
      <div className="my-10 grid lg:grid-cols-3 grid-cols-1 gap-4 w-11/12 mx-auto">
        {session.map((session) => (
          // eslint-disable-next-line react/jsx-key
          <div className="card card-compact bg-base-100 w-80 shadow-xl">
            <form onSubmit={(event) => handleSubmit(event, session._id)}>
              <figure>
                <img src={session?.photoURL || ""} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{session?.title}</h2>
                <p>Study session ID: {session?._id}</p>
                <p>Tutor email: {session?.tutorEmail}</p>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Pick a file</span>
                  </div>
                  <input
                    type="file"
                    name="image"
                    required
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Upload Materials Link</span>
                  </div>
                  <input
                    type="text"
                    name="link"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Upload</button>
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
