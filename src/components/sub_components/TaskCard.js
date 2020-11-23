import React from "react";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 360,
  },
  media: {
    height: 240,
    // width: 250,
  },
});

const TaskCard = ({ task, open }) => {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const handleClick = () => {
    if (!task.hasTurnedIn) {
      open(task.id);
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={task.imageUrl}
          title="uchiha sasuke"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {task.taskName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {task.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {user.status == "Student" ? (
          <Button
            className={task.hasTurnedIn ? "turned_in" : ""}
            size="small"
            color="primary"
            onClick={handleClick}
          >
            {task.hasTurnedIn ? "✔ Turned In" : "Turn In"}
          </Button>
        ) : null}
        {user.status == "Instructor" ? (
          <Button
            onClick={() => history.push(`/submissions/${task.id}`)}
            size="small"
            color="primary"
          >
            View Submissions
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default TaskCard;
