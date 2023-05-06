import { NavLink } from "react-router-dom";
import "./SideBar.scss";
export default function SideBar() {
  return (
    <div className="sidebarContainer">
      <div className="sidebarContainer__title">
        <h2>Danh mục trang</h2>
      </div>
      <div className="sidebarContainer__content">
        <ul className="sidebarContainer__content--tree">
          <li>
            <NavLink to="/account/info">Tài khoản của tôi</NavLink>
          </li>
          <li>
            <span></span>
            <NavLink to="/viewOrder">Đơn hàng của tôi</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
