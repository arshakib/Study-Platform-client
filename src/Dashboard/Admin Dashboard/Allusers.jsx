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
      await axios.patch(`http://localhost:5000/users/${id}`, {
        role,
      });
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
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-6 flex justify-center">
        <label className="w-full sm:w-96 input input-bordered flex items-center gap-2">
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
      <div className="w-full overflow-x-auto">
        <ToastContainer />
        <table className="table w-full">
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
              <tr key={loguser?._id}>
                <th>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={loguser?.photoURL} alt="User Avatar" />
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
                  <div className="font-bold">{loguser?.email}</div>
                </td>
                <td>{loguser?.role}</td>
                <td>
                  <select
                    disabled={user?.email === loguser?.email}
                    name="role"
                    className="select select-bordered w-full"
                    onChange={(event) => handleRoleChange(event, loguser?._id)}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allusers;
