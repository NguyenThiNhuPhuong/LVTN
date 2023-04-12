import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import Item from "./component/Item/Item";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink
        to="/admin/dashboard"
        className={(navData) => (navData.isActive ? "active" : "")}
      >
        <div className="top">
          <div>
            <ShoppingBagIcon className="icon__logo" />
            <span className="logo">BagGirl</span>
          </div>
          <div>
            <MenuIcon className="icon" />
          </div>
        </div>
      </NavLink>
      <div className="center">
        <Item
          to="/admin/dashboard"
          icon={<DashboardIcon />}
          title="Dashboard"
        />
        <Item to="/admin/user" icon={<PersonOutlineIcon />} title="Users" />
        <Item to="/admin/product" icon={<StoreIcon />} title="Products" />
        <Item to="/admin/order" icon={<CreditCardIcon />} title="Orders" />
        <Item
          to="/admin/Delivery"
          icon={<LocalShippingIcon />}
          title="Delivery"
        />
        <Item
          to="/admin/profile"
          icon={<AccountCircleOutlinedIcon />}
          title="Profile"
        />
        <Item to="/admin/logout" icon={<ExitToAppIcon />} title="Logout" />
      </div>
    </div>
  );
};

export default Sidebar;
