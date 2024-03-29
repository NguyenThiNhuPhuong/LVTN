import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./DataTable.scss";
function DataTable() {
  const { orderListUser } = useSelector((state) => state.order);
  return orderListUser?.map((orderItem, index) => {
    return (
      <div className="order__row" key={index}>
        <div className="order__row--name text">{orderItem.name}</div>
        <div className="order__row--email text">{orderItem.email}</div>
        <div className="order__row--total text">{orderItem.price_all}</div>
        <div className="order__row--date text">{orderItem.date}</div>
        <div className="order__row--status text">
          <div
            className="order__row--status--btn"
            style={{
              background:
                orderItem.order_status_id === 1
                  ? "yellow"
                  : orderItem.order_status_id === 5
                  ? "red"
                  : "green",
              color:
                orderItem.order_status_id === 1 ||
                orderItem.order_status_id === 5
                  ? "black"
                  : "white",
            }}
          >
            {orderItem.order_status_name}
          </div>
        </div>
        <div className="order__row--action text">
          <NavLink to={`/viewOrder/user/${orderItem.id}`}>
            <VisibilityIcon />
          </NavLink>
        </div>
      </div>
    );
  });
}

export default DataTable;
