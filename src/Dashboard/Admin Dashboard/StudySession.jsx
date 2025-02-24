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
      const { data } = await axios.get(
        `https://study-ten-blond.vercel.app/adminsessions`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
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
        .patch(`https://study-ten-blond.vercel.app/adminup/${id}`, updateData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
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
        .delete(`https://study-ten-blond.vercel.app/sessions/${id}`)
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
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 overflow-x-auto">
      <div className="h-full w-full">
        <ToastContainer />
        <div className="overflow-x-auto">
          <table className="table w-full min-w-max">
            {/* head */}
            <thead className="hidden sm:table-header-group">
              <tr className="text-xs sm:text-sm md:text-base lg:text-lg">
                <th>Session Title</th>
                <th>Registration Fee</th>
                <th>Status</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sessionData.map((session) => (
                <tr
                  key={session._id}
                  className="block sm:table-row border-b sm:border-none p-4 sm:p-0"
                >
                  <td className="block sm:table-cell p-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-10 w-10">
                          <img
                            src={session?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-sm">
                          {session?.title}
                        </div>
                        <div className="text-xs opacity-50">
                          {session?.tutorName} <br /> {session?.tutorEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="block sm:table-cell p-2">
                    <button
                      onClick={() => {
                        document.getElementById("my_modal_1").showModal();
                        test(session);
                      }}
                      className="font-bold btn btn-xs sm:btn-sm"
                    >
                      $
                      {session?.registrationFee == 0
                        ? "Free"
                        : session?.registrationFee}
                    </button>
                  </td>
                  <td className="block sm:table-cell p-2">
                    <select
                      defaultValue={session?.status}
                      className="select select-bordered w-full max-w-xs text-xs sm:text-sm"
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
                  </td>
                  <td className="block sm:table-cell p-2">
                    <button className="btn btn-xs sm:btn-sm">Details</button>
                  </td>
                  <td className="block sm:table-cell p-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        disabled={session?.status === "pending"}
                        className="btn btn-xs sm:btn-sm"
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
                        disabled={session?.status === "pending"}
                        className="btn btn-xs sm:btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
