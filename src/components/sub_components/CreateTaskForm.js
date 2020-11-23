import React, { Component } from "react";
import TaskCreateImage from "./TaskCreateImage";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { uploadTask } from "../../crud/crud";

const initState = {
  image: null,
  taskName: "",
  details: "",
  selectedImg: null,
  uploading: false,
  errors: {
    image: false,
    details: false,
    taskName: false,
  },
};

class CreateTaskForm extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  handleChange = (e) => {
    const { name } = e.target;
    if (name !== "image") this.setState({ [name]: e.target.value });
    else {
      if (!this.state.selectedImg) {
        const value = e.target.files[0];
        this.setState({ [name]: value });
        const reader = new FileReader();
        let that = this;
        reader.onload = function () {
          that.setState({ selectedImg: reader.result });
        };
        reader.readAsDataURL(value);
      }
    }
  };

  handleSubmit = () => {
    let errors = { image: false, details: false, taskName: false },
      flag = 0;
    const { image, taskName, details } = this.state;
    const task = { image, taskName, details };
    if (!image) {
      flag = 1;
      errors.image = true;
    }
    if (taskName == "") {
      flag = 1;
      errors.taskName = true;
    }
    if (details == "") {
      flag = 1;
      errors.details = true;
    }

    this.setState({ errors });
    if (flag == 0) {
      this.setState({ uploading: true });
      uploadTask(task).then(() => {
        this.setState({ ...initState });
      });
    }
  };

  // componentDidUpdate() {
  //   console.log(this.state.image);
  // }

  removeImage = () => this.setState({ image: null, selectedImg: null });

  render() {
    const { errors } = this.state;
    return (
      <div className="create_task_form_container">
        <form>
          <div className="form_group image_file">
            <div className="image_file_input">
              <input
                id="contained-button-file"
                multiple
                type="file"
                style={{ display: "none" }}
                name="image"
                onChange={this.handleChange}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload Image
                </Button>
              </label>
              {errors.image ? (
                <div className="required_error" style={{ color: "red" }}>
                  *
                </div>
              ) : null}
            </div>
            {this.state.image ? (
              <TaskCreateImage
                name={this.state.image}
                remove={this.removeImage}
                image={this.state.selectedImg}
              />
            ) : null}
          </div>
          <div className="form_group">
            <TextField
              label="Task Name"
              value={this.state.taskName}
              name="taskName"
              onChange={this.handleChange}
            />
            {errors.taskName ? (
              <div className="required_error" style={{ color: "red" }}>
                *
              </div>
            ) : null}
          </div>
          <div className="form_group details_input">
            <label>Details of the Task :</label>
            <textarea
              rows={9}
              cols={70}
              value={this.state.details}
              name="details"
              onChange={this.handleChange}
            ></textarea>
            {errors.details ? (
              <div className="required_error" style={{ color: "red" }}>
                *
              </div>
            ) : null}
          </div>
          <div className="form_group">
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
            >
              {this.state.uploading ? "Uploading..." : "Upload Task"}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTaskForm;
