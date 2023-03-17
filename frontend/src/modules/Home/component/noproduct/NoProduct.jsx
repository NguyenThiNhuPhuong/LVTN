import React from "react";
import styles from "./NoProduct.module.scss";
import classNames from "classnames/bind";
import images from "~/ultil/images";
export default function NoProduct() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx("emptyCart")}>
      <img
        className={cx("emptyCart__img")}
        src={images.emptyCart}
        alt="ảnh lỗi"
      />
      <h1 className={cx("emptyCart__title")}>Không có sản phẩm</h1>
    </div>
  );
}
