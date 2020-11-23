import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import { fetchSubmissions } from "../crud/crud";
import SubmissionsContainer from "../components/sub_components/SubmissionsContainer.js";
import CardSkeletonContainer from "../components/sub_components/CardSkeletonContainer";

const TaskSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { taskId } = useParams();

  useEffect(() => {
    fetchSubmissions(taskId).then((results) => {
      setSubmissions(results);

      setLoading(false);
    });
  }, []);

  const changeGradeStatus = (submissionId, grade) => {
    let arr = [];
    submissions.forEach((sub) => {
      if (submissionId == sub.id) arr.push({ ...sub, grade });
      else arr.push({ ...sub });
    });
    setSubmissions(arr);
  };

  return (
    <div className="task_submissions_page_container">
      <Grid container justify="center">
        <Grid container item xs={10} md={8}>
          <Grid item xs={12}>
            <h2 className="submissions_heading">Submissions for :</h2>
          </Grid>
          {loading ? (
            <CardSkeletonContainer />
          ) : (
            <SubmissionsContainer
              changeGradeStatus={changeGradeStatus}
              submissions={submissions}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default TaskSubmissions;
