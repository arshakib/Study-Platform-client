import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Context/Context";
import { useContext, useEffect, useState } from "react";

const Allusers = () => {
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [apiData, setApiData] = useState([]);
  const { data: userData = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    setApiData(userData);
  }, [userData]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/users?search=${search}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        setApiData(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (search) {
      fetchSearchResults();
    } else {
      setApiData(userData);
    }
  }, [search, userData]);

  const handleRoleChange = async (e, id) => {
    const role = e.target.value;
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, { role });
      refetch();
      toast.success("Role updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-10">
        <label className="w-96 mx-auto input input-bordered flex items-center gap-2">
          <input
            onKeyUp={(e) => setSearch(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <kbd className="kbd kbd-sm">⌘</kbd>
          <kbd className="kbd kbd-sm">K</kbd>
        </label>
      </div>
      <div className="h-full w-full">
        <ToastContainer />
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((loguser) => (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  <th>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={loguser?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{loguser?.name}</div>
                        {user?.email === loguser?.email && (
                          <div className="text-sm opacity-50">(You)</div>
                        )}
                      </div>
                    </div>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{loguser?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{loguser?.role}</td>
                  <td>
                    <select
                      disabled={user?.email === loguser?.email}
                      name="role"
                      className="select select-bordered w-full max-w-xs"
                      onChange={(event) =>
                        handleRoleChange(event, loguser?._id)
                      }
                    >
                      <option disabled selected>
                        Select Your Role
                      </option>
                      <option>student</option>
                      <option>tutor</option>
                      <option>admin</option>
                    </select>
                  </td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
