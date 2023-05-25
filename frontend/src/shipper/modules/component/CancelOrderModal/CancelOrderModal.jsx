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
        order_status_id: 6,
        comment: cancelReason,
      })
    );

    setIsModalOpen(false);
  };
  useEffect(() => {
    if (Alert === "Order has been returned!") {
      toast.success("Đơn hàng cửa bạn đã được hủy thành công");
      dispatch(getAOrder(id));
      dispatch(resetAlert());
    }
  }, [dispatch, id, Alert]);
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
            <p>Vui lòng chọn lý do Trả hàng:</p>
          </div>

          <div className="modal-body">
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Hàng nhận được bị thiếu/sai"
                checked={cancelReason === "Hàng nhận được bị thiếu/sai"}
                onChange={handleCancelReasonChange}
              />
              Hàng nhận được bị thiếu/sai
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Sản phẩm có dấu hiệu hàng giả"
                checked={cancelReason === "Sản phẩm có dấu hiệu hàng giả"}
                onChange={handleCancelReasonChange}
              />
              Sản phẩm có dấu hiệu hàng giả
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Sản phẩm không giống hình ảnh, mô tả"
                checked={
                  cancelReason === "Sản phẩm không giống hình ảnh, mô tả"
                }
                onChange={handleCancelReasonChange}
              />
              Sản phẩm không giống hình ảnh, mô tả
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Sản phầm hư hỏng , bể , vỡ"
                checked={cancelReason === "Sản phầm hư hỏng , bể , vỡ"}
                onChange={handleCancelReasonChange}
              />
              Sản phầm hư hỏng , bể , vỡ
            </label>
            <label>
              <input
                type="radio"
                name="cancelReason"
                value="Trả hàng không ưng ý"
                checked={cancelReason === "Trả hàng không ưng ý"}
                onChange={handleCancelReasonChange}
              />
              Trả hàng không ưng ý
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
