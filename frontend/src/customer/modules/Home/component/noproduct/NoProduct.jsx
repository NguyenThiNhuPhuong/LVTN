import React from "react";
import styles from "./NoProduct.module.scss";
import classNames from "classnames/bind";
import images from "~/ultil/images";
import { useDispatch } from "react-redux";
import { resetParams } from "~/redux/slice/product/ProductSlice";
export default function NoProduct({ title, btn }) {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  return (
    <div className={cx("emptyCart")}>
      <img
        className={cx("emptyCart__img")}
        src={images.emptyCart}
        alt="ảnh lỗi"
      />
      <h1 className={cx("emptyCart__title")}>{title}</h1>
      {btn ? (
        <button onClick={() => dispatch(resetParams())}>Quay lại </button>
      ) : (
        ""
      )}
    </div>
  );
}
