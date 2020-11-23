import React from "react";
import Card from "@material-ui/core/Card";
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
    maxWidth: 345,
  },
  media: {
    height: 220,
  },
});

const SubmissionCard = ({ data, ...props }) => {
  const classes = useStyles();

  const handleClick = () => {
    if (data.grade === null) {
      props.open(data);
    }
  };

  const calcDate = () => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(data.createdAt.seconds * 1000).toLocaleString(
      "en-US",
      options
    );
    return date;
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={data.imageUrl}
          title="image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Submitted By : {data.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Submitted At : {calcDate()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          className={data.grade !== null ? "graded" : ""}
          onClick={handleClick}
          size="small"
          color="primary"
        >
          {data.grade !== null ? "✔ Graded" : "Grade"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default SubmissionCard;
