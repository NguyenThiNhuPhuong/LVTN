import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import Action from "./component/action/Action";
import Logo from "./component/logo/Logo";
import Menu from "./component/menu/Menu";
import Search from "./component/search/Search";

import { MenuOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

function Header(props) {
  return (
    <header className={cx("wrapper")}>
      <MenuOutlined className={cx("iconMenu")} />
      <Logo />
      <Menu />
      <Search />
      <Action />
    </header>
  );
}

export default Header;
