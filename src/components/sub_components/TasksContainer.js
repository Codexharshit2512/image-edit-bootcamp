import React, { useState } from "react";
import TaskCard from "./TaskCard";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import TurnInModalContent from "./TurnInModalContent";
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

const TasksContainer = ({ tasks, updateStatus }) => {
  const [open, setOpen] = useState(false);
  const [activeId, setId] = useState(null);

  const classes = useStyles();

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId(null);
  };

  return (
    <>
      <Grid container item xs={12} spacing={3}>
        {tasks.length == 0 ? (
          <EmptyErrorMsg>
            {"There are no tasks currently assigned"}
          </EmptyErrorMsg>
        ) : (
          tasks.map((task) => (
            <Grid key={task.id} item xs={12} md={4}>
              <TaskCard open={handleOpen} task={task} />
            </Grid>
          ))
        )}
      </Grid>
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
            <TurnInModalContent
              updateStatus={updateStatus}
              taskId={activeId}
              close={handleClose}
            />
          </div>
        </Slide>
      </Modal>
    </>
  );
};

export default TasksContainer;
