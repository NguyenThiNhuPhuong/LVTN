import {
  AndroidOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import HomeIcon from "@mui/icons-material/Home";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
const MENU_ITEMS = [
  {
    icon: <UserOutlined />,
    title: "Đăng Ký",
    to: "/register",
  },
  {
    icon: <UserOutlined />,
    title: "Đăng nhập",
    to: "/login",
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
    to: "/login",
    separate: true,
  },
];
const MENU_HEADER = [
  {
    title: "SHOP",
    to: "/product/shop",
    icon: <HomeIcon />,
    dropdown: true,
  },
  {
    title: "NEW",
    to: "/product/new",
    icon: <FiberNewIcon />,
  },
  {
    title: "ABOUT",
    to: "/about",
    icon: <AnalyticsIcon />,
  },
  {
    title: "SALE",
    to: "/product/sale",
    icon: <CrisisAlertIcon />,
  },
  {
    title: "CONTACT",
    to: "/contact",
    icon: <ContactPhoneIcon />,
  },
];

const MENU_REGISTER = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Username",
    errorMessage: "Tên người dùng phải từ 3-16 ký tự! ",
    label: "Username",
    required: true,
    icon: <UserOutlined />,
  },

  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "Phải là một địa chỉ email hợp lệ!",
    label: "Email",
    required: true,
    icon: <MailOutlined />,
  },

  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Mật khẩu phải bao gồm ký tự in hoa, in thường, chữ số và ký tự đặc biệt",
    label: "Password",
    required: true,
    icon: <LockOutlined />,
  },

  {
    id: 4,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    errorMessage: "Mật khẩu không khớp!",
    label: "confirmPassword",
    required: true,
    icon: <LockOutlined />,
  },
];

const MENU_LOGIN = [
  {
    id: 1,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "Phải là một địa chỉ email hợp lệ!",
    label: "Email",
    required: true,
    icon: <MailOutlined />,
  },
  {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "Mật khẩu phải bao gồm ký tự in hoa, in thường, chữ số và ký tự đặc biệt",
    label: "Password",
    required: true,
    icon: <LockOutlined />,
  },
];
export { USER_MENU, MENU_ITEMS, MENU_HEADER, MENU_REGISTER, MENU_LOGIN };
