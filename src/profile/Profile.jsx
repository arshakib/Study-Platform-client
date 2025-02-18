import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { AuthContext } from "../Context/Context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const { data: role = [] } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full hover:shadow-xl transition-shadow duration-300">
        {/* Profile Photo */}
        <div className="flex justify-center mb-6">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            src={user.photoURL}
            alt="User profile"
          />
        </div>

        {/* User Information */}
        <div className="space-y-4 text-center">
          {/* Name */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.displayName}
            </h2>
          </div>

          {/* Role */}
          <div className="flex items-center justify-center space-x-2">
            <FaUserCircle className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600 font-medium">
              {role?.role || "student"}
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-center space-x-2">
            <MdMail className="h-5 w-5 text-gray-500" />
            <a
              href={`mailto:${user.email}`}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {user.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
