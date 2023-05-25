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
            <NavLink to="/contact">Thông tin liên hệ </NavLink>
          </li>
          <li>
            <span></span>
            <NavLink to="/contact/rating">Đánh giá</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
