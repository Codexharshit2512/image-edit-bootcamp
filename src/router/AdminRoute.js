import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          user.status === "Instructor" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
