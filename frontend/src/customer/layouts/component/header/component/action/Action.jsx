import { ShoppingCartOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MENU_ITEMS, USER_MENU } from "~/components/constant/Menu";
import Image from "~/components/image/Image";
import images from "~/ultil/images";
import styles from "./Action.module.scss";
import AvatarUser from "./component/avatarUser/AvatarUser";
import MenuList from "./component/menuList/MenuList";
function Action() {
  const cx = classNames.bind(styles);

  const Name = useSelector((state) => state.auth.userInfo?.name);
  const cartQuantity = useSelector((state) => state.cart.listCart.length);

  return (
    <div className={cx("action")}>
      <div className={cx("action__dropdown")}>
        <button>
          {Name ? (
            <AvatarUser Auth={Name} />
          ) : (
            <Image
              className={cx("action__dropdown--avatar")}
              src={images.noImage}
              alt="Nguyen Van A"
            />
          )}

          <div className={cx("action__dropdown--content")}>
            <MenuList items={Name ? USER_MENU : MENU_ITEMS} />
          </div>
        </button>
      </div>

      <div className={cx("action__cart")}>
        <NavLink to="/cart">
          <ShoppingCartOutlined />
        </NavLink>
        <span className={cx("action__cart--quantity")}>{cartQuantity}</span>
      </div>
    </div>
  );
}

Action.propTypes = {};

export default Action;
