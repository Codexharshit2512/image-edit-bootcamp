import React, { useState } from "react";
import SubmissionCard from "./SubmissionCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import SubmissionModalContent from "./SubmissionModalContent";
import EmptyErrorMsg from "./EmptyErrorMsg";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    background: "#b6b6b6",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 2, 3),
  },
}));

const SubmissionsContainer = ({ submissions, changeGradeStatus }) => {
  const [submission, setSubmission] = useState(null);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = (sub) => {
    setSubmission(sub);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmission(null);
    }, 501);
  };

  return (
    <Grid container item xs={12} spacing={3} className="submissions_container">
      {submissions.length == 0 ? (
        <EmptyErrorMsg>
          {"There are no submissions to this task currently"}
        </EmptyErrorMsg>
      ) : (
        submissions.map((submission) => (
          <Grid key={submission.id} item xs={12} md={4}>
            <SubmissionCard data={submission} open={handleOpen} />
          </Grid>
        ))
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="up" in={open}>
          <div className={classes.paper}>
            <SubmissionModalContent
              changeGradeStatus={changeGradeStatus}
              data={submission}
              close={handleClose}
            />
          </div>
        </Slide>
      </Modal>
    </Grid>
  );
};

export default SubmissionsContainer;
