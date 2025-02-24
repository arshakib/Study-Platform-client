import { Outlet, useLocation } from "react-router-dom";
import TutorMenu from "./Tutor Dashboard/TutorMenu";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "../Context/Context";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AdminMenu from "./Admin Dashboard/AdminMenu";
import StudentMenu from "./Student Dashboard/StudentMenu";

export const updatesession = createContext(null);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [updatedata, setUpdatedata] = useState({});

  const { data: userData = [] } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://study-ten-blond.vercel.app/users/${user?.email}`
      );
      return data;
    },
  });
  const location = useLocation();
  return (
    <div className="h-[100vh] w-full">
      <div className="flex gap-4 ">
        <div className="w-[20%] h-[100vh] bg-gray-200 p-4 sticky top-0 z-50">
          {userData?.role === "admin" && <AdminMenu />}
          {userData?.role === "tutor" && <TutorMenu />}
          {userData?.role === "student" && <StudentMenu />}
        </div>
        <div className="w-full min-h-screen p-4 md:p-6 lg:p-7 flex flex-col justify-center items-center">
          {location.pathname === "/dashboard" && (
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 sm:py-6 px-4 sm:px-8 rounded-lg shadow-lg text-center w-full max-w-4xl">
              Welcome To The Dashboard
            </h1>
          )}
          <updatesession.Provider value={{ updatedata, setUpdatedata }}>
            <Outlet />
          </updatesession.Provider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
