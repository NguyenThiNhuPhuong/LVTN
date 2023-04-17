import React from "react";
import classNames from "classnames/bind";
import styles from "./AvatarUser.module.scss";
function AvatarUser(props) {
  const { Auth } = props;
  const cx = classNames.bind(styles);
  return (
    <div className={cx("user-avatar")}>{Auth.split(" ").pop().slice(0, 1)}</div>
  );
}

AvatarUser.propTypes = {};

export default AvatarUser;
