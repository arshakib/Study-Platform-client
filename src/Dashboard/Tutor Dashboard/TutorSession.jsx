import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { toast, ToastContainer } from "react-toastify";

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
        `http://localhost:5000/sessions/${user?.email}`
      );
      return data;
    },
  });

  console.log(session);

  const handleSubmit = (id) => {
    axios
      .patch(`http://localhost:5000/session/${id}`)
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
            {session?.map((session) => (
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
                        {
                          new Date(session?.registrationStartDate)
                            .toISOString()
                            .split("T")[0]
                        }
                      </div>
                    </div>
                  </div>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">
                        $ {session?.registrationFee}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{session?.status}</td>
                <td>
                  <button className=" btn  btn-xs">details</button>
                </td>
                <th>
                  <td>
                    <button
                      onClick={() => handleSubmit(session?._id)}
                      className="btn  btn-xs"
                    >
                      ReSubmit
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
  );
};

export default TutorSession;
