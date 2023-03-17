import React from "react";
import images from "../../../ultil/images/index";
import "./PageNotFound.scss";
const PageNotFound = () => {
  return (
    <div className="imgError">
      <img src={images.error404} alt="naaaaa" />;
    </div>
  );
};

export default PageNotFound;
