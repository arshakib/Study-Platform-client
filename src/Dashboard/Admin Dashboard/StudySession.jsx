import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import FeeModal from "./FeeModal";
import { useContext, useState } from "react";
import { updatesession } from "../Dashboard";
import { Link } from "react-router-dom";
import Rejectionreason from "./Rejectionreason ";

const StudySession = () => {
  const { setUpdatedata } = useContext(updatesession);
  const [regfee, setRegfee] = useState({});
  const [update, setUpdate] = useState({});
  const [reject, setReject] = useState({});
  console.log(reject);

  const {
    data: sessionData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/adminsessions`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return data;
    },
  });

  const status = (status, id) => {
    console.log(status, id);

    const updateData = {
      status: status,
    };
    try {
      axios
        .patch(
          `http://localhost:5000/adminup/${id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          },
          updateData
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            refetch();
            toast.success("Status Uploaded Successfully", {
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

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5000/sessions/${id}`)
        .then(() => {
          refetch();
          console.log("session deleted successfully");
          toast.success("Session Deleted Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          refetch();
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

  const test = (data) => {
    setRegfee(data);
  };

  const test2 = (data) => {
    setUpdate(data);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="h-full w-full">
        <ToastContainer />
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Session Title</th>

                <th>Registration Fee</th>
                <th>Status</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sessionData.map((session) => (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  <th>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={session?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{session?.title}</div>
                        <div className="text-sm opacity-50">
                          {session?.tutorName}
                          <br />
                          {session?.tutorEmail}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <button
                          onClick={() => {
                            document.getElementById("my_modal_1").showModal();
                            test(session);
                          }}
                          className="font-bold btn"
                        >
                          $
                          {session?.registrationFee == 0
                            ? "Free"
                            : session?.registrationFee}
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      defaultValue={session?.status}
                      className="select select-bordered w-full max-w-xs"
                      onChange={(e) => {
                        const selectedStatus = e.target.value;
                        status(selectedStatus, session._id);
                        setReject(session._id);
                        if (selectedStatus === "rejected") {
                          const modal = document.getElementById("my_modal_55");
                          if (modal) {
                            modal.showModal();
                          }
                        }
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    <br />
                  </td>
                  <td>
                    <button className=" btn  btn-xs">details</button>
                  </td>
                  <th>
                    <td>
                      <Link
                        disabled={session?.status == "pending"}
                        className="btn mr-5 btn-xs"
                        onClick={() => {
                          test2(session);
                        }}
                        to={`/dashboard/upadatesession/${session?._id}`}
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => {
                          handleDelete(session?._id);
                        }}
                        disabled={session?.status == "pending"}
                        className="btn  btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </th>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
      <FeeModal refetch={refetch} session={regfee} />
      <Rejectionreason refetch={refetch} reject={reject} />
      {setUpdatedata(update)}
    </div>
  );
};

export default StudySession;
