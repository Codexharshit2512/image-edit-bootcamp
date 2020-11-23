import React, { useState } from "react";

import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import { gradeSubmission } from "../../crud/crud";

const SubmissionModalContent = ({ data, ...props }) => {
  const [grade, setGrade] = useState(1);
  const [open, setOpen] = useState(false);
  const [grading, setGrading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    setGrading(true);
    gradeSubmission(data.id, grade).then(() => {
      setGrading(false);
      props.changeGradeStatus(data.id, grade);
      props.close();
    });
  };

  return (
    <div className="submission_modal_content">
      <div className="modal_header">
        <h2>Grade Assignment</h2>
        <div className="close_icon">
          <span onClick={props.close}>
            <CloseIcon />
          </span>
        </div>
      </div>
      <div className="submission_img">
        <img src={data.imageUrl} alt="modal image" />
      </div>
      <div className="student_name">Submitted By: {data.username}</div>
      <div className="submission_date">Submitted At: 5th Nov</div>
      <div className="grade_input">
        <InputLabel id="demo-controlled-open-select-label">Grade</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
            return (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className="grade_submit">
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {grading ? "Grading..." : "Submit Grade"}
        </Button>
      </div>
    </div>
  );
};

export default SubmissionModalContent;
