import React from "react";
import Skeleton from "@mui/material/Skeleton";

import "./Loading.scss";
export default function Loading({ index }) {
  return (
    <div className="LoadingContainer" key={index}>
      <div className="Loading">
        <Skeleton variant="rounded" height={300} />
        <div className="Loading__content">
          <Skeleton width="60%" />
          <Skeleton width="60%" />
          <Skeleton variant="rounded" height={35} />
        </div>
      </div>
    </div>
  );
}
