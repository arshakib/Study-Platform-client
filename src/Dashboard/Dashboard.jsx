import { Outlet } from "react-router-dom";
import TutorMenu from "./Tutor Dashboard/TutorMenu";

const Dashboard = () => {
  return (
    <div className="h-[100vh] w-full">
      <div className="flex gap-4  ">
        <div className="w-[20%] h-[100vh] bg-gray-200 p-4 sticky top-0">
          <TutorMenu />
        </div>
        <div className="w-full m-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
