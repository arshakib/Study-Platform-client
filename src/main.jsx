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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
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
