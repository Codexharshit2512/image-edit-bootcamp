import React from "react";
import CreateTaskForm from "../components/sub_components/CreateTaskForm";

const CreateTask = () => {
  return (
    <div className="create_task_container">
      <h1 className="create_task_heading">Create A Task</h1>
      <CreateTaskForm />
    </div>
  );
};

export default CreateTask;
