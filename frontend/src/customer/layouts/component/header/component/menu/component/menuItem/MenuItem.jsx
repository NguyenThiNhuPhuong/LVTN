import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./MenuItem.module.scss";
import { useDispatch } from "react-redux";
import { resetParams } from "~/redux/slice/product/ProductSlice";

const cx = classNames.bind(styles);

function MenuItem({ title, to }) {
  const dispatch = useDispatch();
  return (
    <NavLink
      key={to}
      className={cx("menu__item")}
      to={to}
      onClick={() => dispatch(resetParams())}
    >
      <span className={cx("menu__item--title")}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MenuItem;
