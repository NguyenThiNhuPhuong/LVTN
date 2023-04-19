import React from "react";
import { useSelector } from "react-redux";
import "./ImgProduct.scss";
function ImgProduct() {
  const { fileList } = useSelector((state) => state.file);
  return (
    <div className="imgContainer">
      <div className="cellImg">
        <img
          src={
            fileList[0]
              ? URL.createObjectURL(fileList[0])
              : "https://salt.tikicdn.com/ts/upload/f3/73/68/7a0282aac832cce455a3d5b061d3b6c3.png"
          }
          alt=""
        />
      </div>

      <div className="thumbImg">
        {Array.from(new Array(4)).map((item, index) => {
          return (
            <img
              key={index}
              src={
                fileList[index]
                  ? URL.createObjectURL(fileList[index])
                  : "https://salt.tikicdn.com/ts/upload/f3/73/68/7a0282aac832cce455a3d5b061d3b6c3.png"
              }
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
}

export default ImgProduct;
