import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user] = useAuthState(auth);

  return (
    <Routes>
      <Route
        {...rest}
        render={(props) =>
          user ? <Component {...props} /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default PrivateRoute;
