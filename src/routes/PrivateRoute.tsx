import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
  roleRequired: "student" | "instructor";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  roleRequired,
}) => {
  const role = localStorage.getItem("role");
  const phone = localStorage.getItem("phone");

  if (!phone || role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
