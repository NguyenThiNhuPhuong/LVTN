import classNames from "classnames/bind";
import { MENU_HEADER } from "~/components/constant/Menu";
import Category from "./component/category/Category";
import MenuItem from "./component/menuItem/MenuItem";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function Menu() {
  return (
    <div className={cx("menuContainer")}>
      <div className={cx("menu")}>
        {MENU_HEADER.map((item, index) => {
          if (item.dropdown === true) {
            return (
              <div className={cx("menu__dropdown")} key={index}>
                <MenuItem title={item.title} to={item.to} />
                <div className={cx("menu__dropdown--content")}>
                  <Category />
                </div>
              </div>
            );
          } else {
            return <MenuItem title={item.title} to={item.to} key={index} />;
          }
        })}
      </div>
    </div>
  );
}

export default Menu;
