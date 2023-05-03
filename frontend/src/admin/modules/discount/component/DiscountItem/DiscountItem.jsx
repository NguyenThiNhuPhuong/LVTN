import moment from "moment/moment";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";

import "./DiscountItem.scss";
import {
  getDiscounts,
  removeDiscount,
  resetRemoveDiscount,
} from "~/redux/slice/discount/DiscountSlice";

function DiscountItem() {
  const dispatch = useDispatch();

  const { discountList, alertDeleteSuccess } = useSelector(
    (state) => state.discount
  );
  useEffect(() => {
    if (alertDeleteSuccess !== "") {
      dispatch(getDiscounts());
      Swal.fire("Saved!", "", "success");
      return () => {
        dispatch(resetRemoveDiscount());
      };
    }
  }, [dispatch, alertDeleteSuccess]);

  const handelRemoveDiscount = (id) => {
    return Swal.fire({
      title: `Bạn có chắc chắn muốn xóa discount ${id}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeDiscount(id));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return discountList.length > 0 ? (
    discountList?.map((discount, index) => {
      return (
        <div className="discount__row" key={index}>
          <div className="discount__row--id text">{discount.id}</div>
          <div className="discount__row--description text">{discount.code}</div>
          <div className="discount__row--createdAt text">
            {discount.purchase_limit}
          </div>
          <div className="discount__row--createdAt text">
            {moment(discount.created_at).format("YYYY-MM-DD")}
          </div>
          <div className="discount__row--updateAt text">
            {discount.expiration_date}
          </div>
          <div className="discount__row--action text">
            <NavLink to={`/admin/discount/${discount.id}`}>
              <VisibilityIcon />
            </NavLink>
            <button onClick={() => handelRemoveDiscount(discount.id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      );
    })
  ) : (
    <div className="noDiscount">Hiện tại không có discount nào 😉 </div>
  );
}

export default DiscountItem;
