import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Item.scss";
function Item({ to, icon, title }) {
  return (
    <div className="ItemContainer">
      <NavLink
        to={to}
        className={(navData) => (navData.isActive ? "active" : "")}
      >
        <div className="ItemContainer__link">
          {icon}
          <span>{title}</span>
        </div>
      </NavLink>
    </div>
  );
}

export default Item;
