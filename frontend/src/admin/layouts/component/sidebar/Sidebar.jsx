import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import Item from "./component/Item/Item";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <NavLink
          to="/admin/dashboard"
          className={(navData) =>
            navData.isActive ? "active top__content" : "top__content"
          }
        >
          <div>
            <ShoppingBagIcon className="icon__logo" />
            <span className="logo">BagGirl</span>
          </div>
          <div>
            <MenuIcon className="icon" />
          </div>
        </NavLink>
      </div>
      <div className="sidebar-center">
        <Item
          to="/admin/dashboard"
          icon={<DashboardIcon />}
          title="Dashboard"
        />
        <Item to="/admin/user" icon={<PersonOutlineIcon />} title="Users" />
        <Item to="/admin/product" icon={<StoreIcon />} title="Products" />
        <Item to="/admin/category" icon={<CategoryIcon />} title="Category" />
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
        <Item
          to="/login"
          icon={<ExitToAppIcon />}
          title="Logout"
          onclick="true"
        />
      </div>
    </div>
  );
};

export default Sidebar;
