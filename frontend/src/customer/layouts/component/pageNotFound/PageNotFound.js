import React from "react";
import "./PageNotFound.scss";
import images from "~/ultil/images";
const PageNotFound = () => {
  return (
    <div className="imgError">
      <img src={images.error404} alt="naaaaa" />;
    </div>
  );
};

export default PageNotFound;
