import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "./Sidebar.scss";
import Item from "./component/Item/Item";
import { useDispatch } from "react-redux";
import { logoutUser } from "~/redux/slice/auth/AuthSlice";
export default function Sidebar() {
  const dispatch = useDispatch();
  return (
    <div className="sidebar-page">
      <div className="group-menu">
        <div className="group-menu__layered">
          <Item
            to="/shipper/dashboard"
            icon={<DashboardIcon />}
            title="Dashboard"
          />
          <Item
            to="/shipper/pendingOrders"
            icon={<CreditCardIcon />}
            title="Pending Orders"
          />
          <Item
            to="/shipper/deliveryOrders"
            icon={<LocalShippingIcon />}
            title="Delivery Orders"
          />
          <Item
            to="/shipper/profile"
            icon={<AccountCircleOutlinedIcon />}
            title="Profile"
          />
          <button onClick={() => dispatch(logoutUser())}>
            <Item to="/login" icon={<ExitToAppIcon />} title="Logout" />
          </button>
        </div>
      </div>
    </div>
  );
}
