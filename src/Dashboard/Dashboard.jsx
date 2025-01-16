import { Outlet } from "react-router-dom";
import TutorMenu from "./Tutor Dashboard/TutorMenu";
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AdminMenu from "./Admin Dashboard/AdminMenu";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);
  const { data: userData = [] } = useQuery({
    queryKey: ["session", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      return data;
    },
  });

  console.log(userData);
  return (
    <div className="h-[100vh] w-full">
      <div className="flex gap-4  ">
        <div className="w-[20%] h-[100vh] bg-gray-200 p-4 sticky top-0">
          {userData?.role === "admin" && <AdminMenu />}
          {userData?.role === "tutor" && <TutorMenu />}
          {/* {userData?.role === "student" && <TutorMenu />} */}
        </div>
        <div className="w-full m-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
