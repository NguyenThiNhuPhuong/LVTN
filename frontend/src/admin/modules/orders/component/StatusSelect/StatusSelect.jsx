import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParams } from "~/redux/slice/order/OrderSlice";
import "./StatusSelect.scss";
const listStatus = [
  { name: "chờ xác nhận", value: 1 },
  { name: "chờ lấy hàng", value: 2 },
  { name: "đang giao", value: 3 },
  { name: "Đã giao", value: 4 },
  { name: "Đã hủy", value: 5 },
  { name: "Trả hàng", value: 6 },
];
function StatusSelect() {
  const dispatch = useDispatch();
  const { params } = useSelector((state) => state.order);
  console.log(params);
  const handleSubmitStatus = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    dispatch(setParams({ ...params, status_id: e.target.value }));
  };
  return (
    <div>
      {" "}
      <div className="SelectContainer">
        <select
          name=""
          onChange={handleSubmitStatus}
          value={params.status_id}
          className="menu-item"
        >
          <option value="">
            <span className="title">TẤT CẢ</span>
          </option>
          {listStatus?.map((status, index) => {
            return (
              <option value={status.value}>
                <span className="title">{status.name}</span>
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default StatusSelect;
