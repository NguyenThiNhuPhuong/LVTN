import { Skeleton } from "@mui/material";
import React from "react";
import "./LoadingDetailProduct.scss";
function LoadingDetailProduct() {
  return (
    <div className="LoadingDetailProduct">
      <div className="Loading">
        <div className="Loading__listImg">
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>

        <Skeleton variant="rounded" height={440} />
      </div>

      <div className="Loading__content">
        <Skeleton width="30%" />
        <Skeleton width="30%" />
        <Skeleton width="30%" />
        <Skeleton variant="rounded" height={200} />
        <Skeleton width="60%" height={60} />
      </div>
    </div>
  );
}

export default LoadingDetailProduct;
