import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);

function MenuItem({ title, to, key }) {
  return (
    <NavLink className={cx("menu__item")} to={to} key={key}>
      <span className={cx("menu__item--title")}>{title}</span>
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default MenuItem;
