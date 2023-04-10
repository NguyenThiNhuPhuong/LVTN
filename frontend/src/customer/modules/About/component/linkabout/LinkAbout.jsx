import classNames from "classnames/bind";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./LinkAbout.module.scss";

export default function LinkAbout() {
  const cx = classNames.bind(styles);
  const [block, setBlock] = useState(true);
  return (
    <div className={cx("sidebar-page")}>
      <div className={cx("group-menu")}>
        <div
          className={cx("group-menu__title")}
          onClick={() => setBlock(!block)}
        >
          <h2>Danh mục trang</h2>
        </div>
        <div
          className={cx("group-menu__layered")}
          style={{ display: block ? "block" : "none" }}
        >
          <ul>
            <li className={cx("active")}>
              <NavLink to="/about">Giới thiệu</NavLink>
            </li>

            <li className={cx("")}>
              <NavLink to="/about/returnPolicy">Chính sách đổi trả</NavLink>
            </li>

            <li className={cx("")}>
              <NavLink to="/about/privacyPolicy">Chính sách bảo mật</NavLink>
            </li>

            <li className={cx("")}>
              <NavLink to="/about/termsService">Điều khoản dịch vụ</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
