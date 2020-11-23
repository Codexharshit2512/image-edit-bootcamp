import React from "react";
import Grid from "@material-ui/core/Grid";

const EmptyErrorMsg = (props) => {
  return (
    <Grid item xs={10} sm={8} md={6}>
      <div className="empty_error_msg">
        <p style={{ color: "red", fontSize: "20px" }}>{props.children}</p>
      </div>
    </Grid>
  );
};

export default EmptyErrorMsg;
