import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { turnInAssigment } from "../../crud/crud";

const TurnInModalContent = ({ taskId, close, ...rest }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [error, setError] = useState(false);
  const [uploading, setUpload] = useState(false);

  const handleSubmit = () => {
    if (!file) setError(true);
    else {
      setError(false);
      setUpload(true);
      turnInAssigment(taskId, file).then(() => {
        rest.updateStatus(taskId);
        close();
      });
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setName(e.target.files[0].name);
  };

  const removePreview = () => {
    setFile(null);
    setName(null);
  };

  return (
    <div className="turn_in_container">
      <div className="turn_in_modal_header">
        <h2>Turn In</h2>
        <div className="close_modal">
          <span onClick={close}>
            <CloseIcon />
          </span>
        </div>
      </div>
      <div className="turn_in_modal_content">
        <div className="upload_file_input">
          <input
            accept="image/*"
            // className={classes.input}
            id="contained-button-file"
            multiple
            name=""
            type="file"
            onChange={handleChange}
            hidden
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
            {error ? (
              <div style={{ color: "red", fontSize: "18px" }}>*</div>
            ) : null}
          </label>
        </div>
        {name ? (
          <div className="preview_image_name">
            <span className="preview_container">
              {name}
              <span onClick={removePreview} className="close_preview">
                &times;
              </span>
            </span>
          </div>
        ) : null}
      </div>
      <div className="submit_assignment_btn">
        <Button onClick={handleSubmit} variant="contained" color="secondary">
          {uploading ? "Uploading..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default TurnInModalContent;
