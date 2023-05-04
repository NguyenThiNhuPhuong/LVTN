import VisibilityIcon from "@mui/icons-material/Visibility";
import { NavLink } from "react-router-dom";
import "./OrderItem.scss";
function OrderItem({ orderList }) {
  return orderList?.map((orderItem, index) => {
    return (
      <div className="order__row" key={index}>
        <div className="order__row--name text">{orderItem.name}</div>
        <div className="order__row--email text">{orderItem.email}</div>
        <div className="order__row--paid text">{orderItem.phone}</div>
        <div className="order__row--total text">{orderItem.price_all}</div>
        <div className="order__row--date text">{orderItem.date}</div>
        <div className="order__row--status text">
          <div
            className="order__row--status--btn"
            style={{
              background: "green",
            }}
          >
            {orderItem.order_status_name}
          </div>
        </div>
        <div className="order__row--action text">
          <NavLink to={`/admin/order/detailOrder/${orderItem.id}`}>
            <VisibilityIcon />
          </NavLink>
        </div>
      </div>
    );
  });
}

export default OrderItem;
