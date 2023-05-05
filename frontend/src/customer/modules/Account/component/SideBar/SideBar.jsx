import { NavLink } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="sidebar-page">
      <div className="group-menu">
        <div className="page_menu_title title_block">
          <h2>Danh mục trang</h2>
        </div>
        <div className="layered layered-category">
          <div className="layered-content">
            <ul className="tree-menu">
              <li className="active">
                <span></span>
                <NavLink to="/account/info">Tài khoản của tôi</NavLink>
              </li>

              <li className="">
                <span></span>
                <NavLink to="/viewOrder">Đơn hàng của tôi</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
