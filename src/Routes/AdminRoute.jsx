/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { data: isAdmin = [] } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      return data;
    },
  });

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (isAdmin?.role === "admin") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default AdminRoute;
