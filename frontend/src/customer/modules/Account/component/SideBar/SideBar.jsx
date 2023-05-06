import { NavLink } from "react-router-dom";
import "./SideBar.scss";
export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__title">
        <h2>Danh mục trang</h2>
      </div>
      <div className="sidebar__content">
        <ul className="sidebar__content--tree">
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
