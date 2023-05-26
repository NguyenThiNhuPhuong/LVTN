import { ShoppingCartOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MENU_ITEMS, USER_MENU } from "~/components/constant/Menu";
import Image from "~/components/image/Image";
import { getUserProfile } from "~/redux/slice/user/UserSlice";
import images from "~/ultil/images";
import styles from "./Action.module.scss";
import AvatarUser from "./component/avatarUser/AvatarUser";
import MenuList from "./component/menuList/MenuList";
function Action() {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  console.log(userProfile);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const cartQuantity = useSelector((state) => state.cart.listCart?.length);

  return (
    <div className={cx("action")}>
      <div className={cx("action__dropdown")}>
        <button>
          {userProfile?.avatar ? (
            <img
              className={cx("action__dropdown--avatar")}
              src={
                userProfile.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5jdCRwv_UItyMFSKNJSxp6f6lgMi1DRz3LV3neY8t6A&s"
              }
              alt=""
            />
          ) : userProfile?.name ? (
            <AvatarUser Auth={userProfile?.name} />
          ) : (
            <Image
              src={images.noImage}
              alt="Nguyen Van A"
              className={cx("action__dropdown--avatar")}
            />
          )}

          <div className={cx("action__dropdown--content")}>
            <MenuList items={userProfile?.name ? USER_MENU : MENU_ITEMS} />
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
