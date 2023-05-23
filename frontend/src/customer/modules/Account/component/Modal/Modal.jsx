const Modal = ({ orderSingle, setIsModal }) => {
  const statuses = [
    "Chờ xác nhận",
    "Đã được xác nhận",
    "Chờ lấy hàng",
    "Đang giao",
    "Đã giao",
  ];
  const statusId =
    orderSingle.approval[orderSingle.approval?.length - 1].order_status_id;
  return (
    <form className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Thông tin đơn hàng</h3>
          <span className="close" onClick={(e) => setIsModal(false)}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          {statuses.map((status, index) => (
            <div className="item">
              <div
                className="item__line"
                style={{
                  "--color": index + 1 === statusId ? "green" : "gray",
                }}
              ></div>
              <div
                key={index}
                style={{ color: index + 1 <= statusId ? "green" : "gray" }}
              >
                <div>{status}</div>
                <div>
                  {orderSingle.approval?.length > 0 &&
                    orderSingle?.approval[index]?.action_time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
export default Modal;
