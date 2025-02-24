/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const TutorSession = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const {
    data: session = [],
    isLoading,
    refetch,
  } = useQuery({
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
  const { data: getreject = [] } = useQuery({
    queryKey: ["getreject"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://study-ten-blond.vercel.app/rejectdata`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return data;
    },
  });

  console.log(session);

  const handleSubmit = (id) => {
    axios
      .patch(`https://study-ten-blond.vercel.app/session/${id}`)
      .then(() => {
        refetch();
        toast.success("Session Approved", {
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
        console.error("Error approving session:", error);
        toast.error("Failed to approve session. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  console.log(session);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="h-full w-full p-4">
      <ToastContainer />
      <div className="overflow-x-auto">
        <table className="table w-full min-w-max border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-100 text-xs sm:text-sm">
            <tr>
              <th className="text-left px-2 sm:px-4 py-2">Session Title</th>
              <th className="text-left px-2 sm:px-4 py-2">Registration Fee</th>
              <th className="text-left px-2 sm:px-4 py-2">Status</th>
              <th className="text-left px-2 sm:px-4 py-2">View</th>
              <th className="text-left px-2 sm:px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
            {session?.map((session) => (
              <tr key={session?._id} className="border-b">
                {/* Session Title & Avatar */}
                <td className="px-2 sm:px-4 py-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                        <img
                          src={session?.photoURL}
                          alt="Avatar"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{session?.title}</div>
                      <div className="text-xs sm:text-sm opacity-50">
                        {
                          new Date(session?.registrationStartDate)
                            .toISOString()
                            .split("T")[0]
                        }
                      </div>
                    </div>
                  </div>
                </td>

                {/* Registration Fee */}
                <td className="px-2 sm:px-4 py-3 font-bold">
                  $ {session?.registrationFee}
                </td>

                {/* Status & Rejection Details */}
                <td className="px-2 sm:px-4 py-3">
                  {session?.status}
                  {session?.status === "rejected" &&
                    getreject.map(
                      (reject) =>
                        reject?.rejectSessionid === session?._id && (
                          <div className="bg-red-500 my-2 p-2 rounded-md text-white text-xs sm:text-sm">
                            <div>{reject?.reject}</div>
                            {reject?.feedback}
                          </div>
                        )
                    )}
                </td>

                {/* View Button */}
                <td className="px-2 sm:px-4 py-3">
                  <Link
                    to={`tutorsessionview/${session?._id}`}
                    className="btn btn-primary btn-xs sm:btn-sm"
                  >
                    Details
                  </Link>
                </td>

                {/* Resubmit Button */}
                <td className="px-2 sm:px-4 py-3">
                  <button
                    onClick={() => handleSubmit(session?._id)}
                    className="btn btn-secondary btn-xs sm:btn-sm"
                  >
                    ReSubmit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorSession;
