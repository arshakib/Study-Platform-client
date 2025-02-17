import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

/* eslint-disable react/prop-types */
const Rejectionreason = ({ refetch, reject }) => {
  console.log(reject);
  const handelSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const reason = form.reason.value;
    const feedback = form.feedback.value;
    const rejectSessionid = reject;

    const rejectData = {
      reject: reason,
      feedback: feedback,
      rejectSessionid: rejectSessionid,
    };

    try {
      axios
        .post(`http://localhost:5000/rejectdata`, rejectData)
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            toast.success("Rejected Successfully", {
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
      <ToastContainer />
      <dialog id="my_modal_55" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handelSubmit}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Rejection reason</span>
              </div>
              <input
                type="text"
                name="reason"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Feedback</span>
              </div>
              <input
                type="text"
                name="feedback"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <button className="btn my-4">Submit</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Rejectionreason;
