import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import "./Sidebar.scss";
import Item from "./component/Item/Item";
export default function Sidebar() {
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
          <Item to="/admin/logout" icon={<ExitToAppIcon />} title="Logout" />
        </div>
      </div>
    </div>
  );
}
