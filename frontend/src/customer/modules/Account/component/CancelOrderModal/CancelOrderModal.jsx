import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateStatusOrder } from "~/redux/slice/order/OrderSlice";

import { Warning } from "@mui/icons-material";

const CancelOrderModal = ({ setIsModalOpen, id }) => {
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
                value="Muốn thay đổi địa chỉ giao hàng"
                checked={cancelReason === "Muốn thay đổi địa chỉ giao hàng"}
                onChange={handleCancelReasonChange}
              />
              Muốn thay đổi địa chỉ giao hàng
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Muốn nhập/thay đổi mã Voucher"
                checked={cancelReason === "Muốn nhập/thay đổi mã Voucher"}
                onChange={handleCancelReasonChange}
              />
              Muốn nhập/thay đổi mã Voucher
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Muốn thay đổi sản phẩm trong đơpn hàng"
                checked={
                  cancelReason === "Muốn thay đổi sản phẩm trong đơpn hàng"
                }
                onChange={handleCancelReasonChange}
              />
              Muốn thay đổi sản phẩm trong đơpn hàng
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Thủ tục thanh toán quá rắc rối"
                checked={cancelReason === "Thủ tục thanh toán quá rắc rối"}
                onChange={handleCancelReasonChange}
              />
              Thủ tục thanh toán quá rắc rối
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Lý do khác"
                checked={cancelReason === "Lý do khác"}
                onChange={handleCancelReasonChange}
              />
              Lý do khác
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
