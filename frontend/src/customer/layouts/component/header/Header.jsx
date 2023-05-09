import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import Action from "./component/action/Action";
import Logo from "./component/logo/Logo";
import Menu from "./component/menu/Menu";
import Search from "./component/search/Search";
import Drawer from "./component/drawer/Drawer";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <Drawer />
      <Logo />
      <Menu />
      <Search />
      <Action />
    </header>
  );
}

export default Header;
