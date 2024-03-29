import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { resetCart } from "~/redux/slice/cart/CartSlice";
import styles from "./MenuList.module.scss";
import { logoutUser } from "~/redux/slice/user/UserSlice";
const cx = classNames.bind(styles);
export default function MenuList({ items }) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(resetCart());
    dispatch(logoutUser());
  };
  return (
    <div className={cx("menu__list")}>
      {items.map((item, index) => {
        if (item.separate === true) {
          return (
            <div className={cx("menu__item")} key={index}>
              <button onClick={() => logout()}>
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
