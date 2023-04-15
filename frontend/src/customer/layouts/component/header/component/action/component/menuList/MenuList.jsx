import classNames from "classnames/bind";
import styles from "./MenuList.module.scss";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "~/redux/slice/auth/AuthSlice";
const cx = classNames.bind(styles);
export default function MenuList({ items }) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
    // Cookies.remove("accessToken");
    // Cookies.remove("role");
    // localStorage.removeItem("cart");
    // window.location.reload();
  };
  return (
    <div className={cx("menu__list")}>
      {items.map((item, index) => {
        if (item.separate === true) {
          return (
            <div className={cx("menu__item")} key={index}>
              <button onClick={logout}>
                <NavLink to={item.to}>
                  <span className={cx("menu__item--title")}>{item.title}</span>
                </NavLink>
              </button>
            </div>
          );
        } else {
          return (
            <div className={cx("menu__item")} key={index}>
              <NavLink to={item.to}>
                <span className={cx("menu__item--title")}>{item.title}</span>
              </NavLink>
            </div>
          );
        }
      })}
    </div>
  );
}
