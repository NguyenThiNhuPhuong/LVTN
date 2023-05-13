import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import CategoryIcon from "@mui/icons-material/Category";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StoreIcon from "@mui/icons-material/Store";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";
import Item from "./component/Item/Item";
import { useDispatch } from "react-redux";
import { logoutUser } from "~/redux/slice/auth/AuthSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
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
        <Item to="/admin/discount" icon={<CategoryIcon />} title="Discount" />

        <Item to="/admin/order" icon={<CreditCardIcon />} title="Orders" />
        <Item to="/admin/slider" icon={<BrokenImageIcon />} title="Slider" />
        <Item
          to="/admin/profile"
          icon={<AccountCircleOutlinedIcon />}
          title="Profile"
        />
        <button onClick={() => dispatch(logoutUser())}>
          <Item
            to="/login"
            icon={<ExitToAppIcon />}
            title="Logout"
            onclick="true"
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
