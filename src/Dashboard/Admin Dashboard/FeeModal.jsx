import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const FeeModal = ({ refetch, session }) => {
  // eslint-disable-next-line react/prop-types
  const { _id } = session;
  const handelFee = (e) => {
    e.preventDefault();
    const form = e.target;
    const fee = parseInt(form.fee.value);
    // eslint-disable-next-line react/prop-types
    console.log(session);
    const newFee = {
      registrationFee: fee,
    };
    try {
      axios
        .patch(
          `https://study-ten-blond.vercel.app/adminup/${_id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          },
          newFee
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            toast.success("Fee Uploaded Successfully", {
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
    } catch (error) {
      console.log(error.response?.data.message || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handelFee}>
        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Registration fee</span>
              </div>
              <input
                type="text"
                name="fee"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <button className="btn btn-success mt-3">Update</button>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </form>
    </div>
  );
};

export default FeeModal;
