import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getAOrder,
  resetAlert,
  updateStatusOrder,
} from "~/redux/slice/order/OrderSlice";

import { Warning } from "@mui/icons-material";

const CancelOrderModal = ({ setIsModalOpen, id }) => {
  const { Alert } = useSelector((state) => state.order);

  const [cancelReason, setCancelReason] = useState("");
  const dispatch = useDispatch();
  const handleCancelReasonChange = (event) => {
    setCancelReason(event.target.value);
  };
  const handleCancelOrder = () => {
    dispatch(
      updateStatusOrder({
        id,
        order_status_id: 5,
        comment: cancelReason,
      })
    );

    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Lý do hủy đơn</h3>
            <span className="close" onClick={(e) => setIsModalOpen(false)}>
              &times;
            </span>
          </div>
          <div className="modal-warning">
            <Warning />
            <p>Vui lòng chọn lý do hủy đơn hàng:</p>
          </div>

          <div className="modal-body">
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Đơn hàng gặp sự cố"
                checked={cancelReason === "Đơn hàng gặp sự cố"}
                onChange={handleCancelReasonChange}
              />
              Đơn hàng gặp sự cố
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Khách hàng muốn thay đổi địa chỉ"
                checked={cancelReason === "Khách hàng muốn thay đổi địa chỉ"}
                onChange={handleCancelReasonChange}
              />
              Khách hàng muốn thay đổi địa chỉ
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Khách hàng muốn nhập mã giảm giá khác"
                checked={
                  cancelReason === "Khách hàng muốn nhập mã giảm giá khác"
                }
                onChange={handleCancelReasonChange}
              />
              Khách hàng muốn nhập mã giảm giá khác
            </label>
          </div>

          <div className="modal-footer">
            <button onClick={handleCancelOrder}>Đồng ý</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CancelOrderModal;
