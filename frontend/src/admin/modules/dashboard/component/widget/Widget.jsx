import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useSelector } from "react-redux";

const Widget = ({ type, amount }) => {
  let data;
  const { dashboardList } = useSelector((state) => state.dashboard);

  //temporary
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        amount: dashboardList.user,
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        amount: dashboardList.order,
      };
      break;
    case "category":
      data = {
        title: "CATEGORY",
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        amount: dashboardList.category,
      };
      break;
    case "discount":
      data = {
        title: "DISCOUNT",
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        amount: dashboardList.discount,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widgetAdminContainer" key={data.title}>
      <div className="widgetAdminContainer__left">
        <span className="widgetAdminContainerContainer__left--title">
          {data.title}
        </span>
        <span className="widgetAdminContainer__left--counter">
          {data.amount}
        </span>
        <span className="widgetAdminContainer__left--link">{data.link}</span>
      </div>
      <div className="widgetAdminContainer__right">
        <div className="widgetAdminContainer__right--percentage">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        <div className="widgetAdminContainer__right--icon">{data.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
