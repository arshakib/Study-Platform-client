import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import Login from "../src/Login/Login";
import Register from "./Register/Register";
import Context from "./Context/Context";
import Home from "./Home/Home";
import Dashboard from "./Dashboard/Dashboard";
import CreateSession from "./Dashboard/Tutor Dashboard/CreateSession";
import { ThemeProvider } from "@material-tailwind/react";
import TutorSession from "./Dashboard/Tutor Dashboard/TutorSession";
import UploadMate from "./Dashboard/Tutor Dashboard/UploadMate";
import ViewMate from "./Dashboard/Tutor Dashboard/ViewMate";
import Allusers from "./Dashboard/Admin Dashboard/Allusers";
import StudySession from "./Dashboard/Admin Dashboard/StudySession";
import AllMate from "./Dashboard/Admin Dashboard/AllMate";
import CreateNote from "./Dashboard/Student Dashboard/CreateNote";
import ViewNote from "./Dashboard/Student Dashboard/ViewNote";
import Show from "./Show Session Data/Show";
import Private from "./Routes/Private";
import Payment from "./Payment/Payment";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/viewdata/:id",
        element: (
          <Private>
            <Show />
          </Private>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/payment/:id",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "createsession",
        element: <CreateSession />,
      },
      {
        path: "tutorsession",
        element: <TutorSession />,
      },
      {
        path: "materials",
        element: <UploadMate />,
      },
      {
        path: "viewmaterials",
        element: <ViewMate />,
      },
      {
        path: "allusers",
        element: <Allusers />,
      },
      {
        path: "viewallsession",
        element: <StudySession />,
      },
      {
        path: "viewallmaterials",
        element: <AllMate />,
      },
      {
        path: "createnote",
        element: <CreateNote />,
      },
      {
        path: "viewnote",
        element: <ViewNote />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </Context>
  </StrictMode>
);
