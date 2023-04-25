import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Loading.scss";
function Loading() {
  return (
    <div className="loadingContainer">
      <CircularProgress />
      <div class="loading">
        <div class="l">l</div>
        <div class="o">o</div>
        <div class="a">a</div>
        <div class="d">d</div>
        <div class="i">i</div>
        <div class="n">n</div>
        <div class="g">g</div>
      </div>
    </div>
  );
}

export default Loading;
