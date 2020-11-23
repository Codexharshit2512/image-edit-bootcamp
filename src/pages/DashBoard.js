import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TasksContainer from "../components/sub_components/TasksContainer";
import { fetchTasks } from "../crud/crud";
import CardSkeletonContainer from "../components/sub_components/CardSkeletonContainer";

const DashBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks().then((results) => {
      setTasks(results);
      setLoading(false);
    });
  }, []);

  const updateStatus = (taskId) => {
    let arr = [];
    tasks.forEach((task) => {
      if (task.id == taskId) arr.push({ ...task, hasTurnedIn: true });
      else arr.push({ ...task });
    });
    setTasks(arr);
  };

  return (
    <div className="dashboard_container">
      <Grid container justify="center">
        <Grid container item xs={10} md={8}>
          <Grid item xs={12}>
            <h2 className="dashboard_heading">Tasks</h2>
          </Grid>
          {tasksLoading ? (
            <CardSkeletonContainer />
          ) : (
            <TasksContainer updateStatus={updateStatus} tasks={tasks} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default DashBoard;
