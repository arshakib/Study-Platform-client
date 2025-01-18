import { Outlet, useLocation } from "react-router-dom";
import TutorMenu from "./Tutor Dashboard/TutorMenu";
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AdminMenu from "./Admin Dashboard/AdminMenu";
import StudentMenu from "./Student Dashboard/StudentMenu";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const { data: userData = [] } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      return data;
    },
  });
  const location = useLocation();
  return (
    <div className="h-[100vh] w-full">
      <div className="flex gap-4  ">
        <div className="w-[20%] h-[100vh] bg-gray-200 p-4 sticky top-0">
          {userData?.role === "admin" && <AdminMenu />}
          {userData?.role === "tutor" && <TutorMenu />}
          {userData?.role === "student" && <StudentMenu />}
        </div>
        <div className="w-full m-7">
          {location.pathname === "/dashboard" && (
            <h1 className="text-5xl font-bold mb-6 flex justify-center items-center h-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-6 px-8 rounded-lg shadow-lg">
              Welcome To The Dashboard
            </h1>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
