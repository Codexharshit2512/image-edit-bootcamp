import React from "react";
import CardSkeleton from "./CardSkeleton";
import Grid from "@material-ui/core/Grid";

const CardSkeletonContainer = () => {
  return (
    <Grid className={{ marginTop: "2rem" }} container item spacing={4}>
      <Grid item xs={10} sm={8} md={4}>
        <CardSkeleton />
      </Grid>
      <Grid item xs={10} sm={8} md={4}>
        <CardSkeleton />
      </Grid>
      <Grid item xs={10} sm={8} md={4}>
        <CardSkeleton />
      </Grid>
    </Grid>
  );
};

export default CardSkeletonContainer;
