import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./Loading.scss";
export default function Loading() {
  return (
    <div style={{ display: "flex", margin: 50 }}>
      <Skeleton height={300} width={300} />
      <div style={{ display: "flex", direction: "column" }}>
        <Skeleton
          count={5}
          height={30}
          width={250}
          style={{ marginBottom: 20 }}
        />
      </div>
    </div>
  );
}
