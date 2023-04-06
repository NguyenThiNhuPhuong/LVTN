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

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink
        to="/admin"
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
        <NavLink
          //   to="/users"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <div className="item">
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <div className="item">
            <PersonOutlineIcon className="icon" />
            <span>Users</span>
          </div>
        </NavLink>

        <NavLink
          to="/products"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <div className="item">
            <StoreIcon className="icon" />
            <span>Products</span>
          </div>
        </NavLink>
        <NavLink
          to="/users"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <div className="item">
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </div>
        </NavLink>

        <NavLink
          to="/users"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <div className="item">
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </div>
        </NavLink>

        <NavLink
          to="/users"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <div className="item">
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </div>
        </NavLink>

        <NavLink
          to="/users"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <div className="item">
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
