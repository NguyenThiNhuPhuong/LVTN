import { UserOutlined } from "@ant-design/icons";
const MENU_ITEMS = [
  {
    icon: <UserOutlined />,
    title: "Đăng Ký",
    to: "/user/register",
  },
  {
    icon: <UserOutlined />,
    title: "Đăng nhập",
    to: "/user/login",
  },
];
const USER_MENU = [
  {
    icon: <UserOutlined />,
    title: "View profile",
    to: "/account/info",
  },
  {
    icon: <UserOutlined />,
    title: "Log out",
    to: "/user/login",
    separate: true,
  },
];
const MENU_HEADER = [
  {
    title: "SHOP",
    to: "/product/shop",
    dropdown: true,
  },
  {
    title: "NEW",
    to: "/product/new",
  },
  {
    title: "ABOUT",
    to: "/about",
  },
  {
    title: "SALE",
    to: "/product/sale",
  },
  {
    title: "CONTACT",
    to: "/contact",
  },
];
export { USER_MENU, MENU_ITEMS, MENU_HEADER };
