import React from "react";
import Button from "@material-ui/core/Button";

const TaskCreateImage = (props) => {
  return (
    <div className="task_create_image_container">
      <div className="selected_image_container">
        <div className="selected_img_name">
          <img src={props.image} alt="" />
        </div>
        <div className="cancel_button">
          <Button
            style={{ background: "red" }}
            onClick={props.remove}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreateImage;
