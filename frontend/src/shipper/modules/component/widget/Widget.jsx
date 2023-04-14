import "./Widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",

        backgroundColor: "rgba(255, 0, 0, 0.2)",
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",

        backgroundColor: "rgba(218, 165, 32, 0.2)",
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",

        backgroundColor: "rgba(0, 128, 0, 0.2)",
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",

        backgroundColor: "rgba(128, 0, 128, 0.2)",
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget" style={{ background: `${data.backgroundColor}` }}>
      <span className="widget__title">{data.title}</span>
      <span className="widget__counter">
        {data.isMoney && "$"} {amount}
      </span>
      <span className="widget__link">{data.link}</span>
    </div>
  );
};

export default Widget;
