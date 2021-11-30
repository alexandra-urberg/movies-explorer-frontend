import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router";

const ProtectedRoute = ({ component: Component, ...props }) => {
  let location = useLocation();
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to={location.pathname} />
      }
    </Route>
  );
};

export default ProtectedRoute;
