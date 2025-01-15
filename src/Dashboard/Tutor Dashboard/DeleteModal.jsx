import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

// eslint-disable-next-line react/prop-types
const DeleteModal = ({ item }) => {
  // eslint-disable-next-line react/prop-types
  const { _id, materialimage, link } = item;

  const handaleUpadte = async (event) => {
    event.preventDefault();
    const form = event.target;
    const image = form.image.value;
    const link = form.link.value;

    console.log(image, link);

    if (!image || !link) {
      console.error("Image or link is missing.");
      return;
    }

    const updateData = {
      materialimage: image,

      link: link,
    };
    try {
      axios
        .patch(`http://localhost:5000/materials/${_id}`, updateData)
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
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
          window.location.reload();
        })
        .catch((error) => {
          console.error(error.response?.data.message || error.message);
        });
    } catch (error) {
      console.log(error.response?.data.message || error.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handaleUpadte}>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Your Materials!</h3>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Update Photo
              </label>
              <input
                type="text"
                name="image"
                defaultValue={materialimage}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Upload Materials Link</span>
              </div>
              <input
                type="text"
                name="link"
                defaultValue={link}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <div>
              <button className="btn">Update</button>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </form>
    </div>
  );
};

export default DeleteModal;
