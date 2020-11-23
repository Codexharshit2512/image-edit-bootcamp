import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const CardSkeleton = () => {
  return (
    <div className="card_skeleton">
      <Skeleton variant="rect" width={320} height={170} />
      <Skeleton />
      <Skeleton width="80%" />
    </div>
  );
};

export default CardSkeleton;
