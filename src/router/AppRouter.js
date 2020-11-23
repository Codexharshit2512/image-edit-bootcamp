import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Header from "../components/sub_components/Header";
import CreateTask from "../pages/CreateTask";
import DashBoard from "../pages/DashBoard";
import TaskSubmissions from "../pages/TaskSubmissions";
import { AdminRoute } from "./AdminRoute";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <AdminRoute exact path="/create_task" component={CreateTask} />
          <PrivateRoute exact path="/" component={DashBoard} />
          <AdminRoute
            exact
            path="/submissions/:taskId"
            component={TaskSubmissions}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default AppRouter;
