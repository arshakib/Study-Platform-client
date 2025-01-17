/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import { useContext } from "react";
import Loading from "../Loading/Loading";

const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loading />;
  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default Private;
