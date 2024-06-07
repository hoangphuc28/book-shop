import { Skeleton } from "@mui/material";
import { Fragment } from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="grid grid-cols-4 gap-4">
      <div>
      <Skeleton width="100%" sx={{ height: 325 }} animation="wave" variant="rectangular" />
      <Skeleton  width="100%" animation="wave" height={10} style={{ marginBottom: 6 }} />
      <Skeleton width="100%" animation="wave" height={10}  />
      </div>
    </div>
  )
}
