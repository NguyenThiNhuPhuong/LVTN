import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalItem,
  getTotalOrderStatus,
  getTotalRevenueForShipper,
} from "~/redux/slice/dashboard/DashboardSlice";
import OrderStatusChart from "../component/OrderStatusChart/OrderStatusChart";
import RevenueChart from "../component/RevenueChart/RevenueChart";
import "./DashBoardShipper.scss";
function DashBoardShipper() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTotalItem());
    dispatch(getTotalRevenueForShipper({ year: 2023, id: userInfo.id }));
    dispatch(getTotalOrderStatus());
  }, [dispatch, userInfo.id]);
  return (
    <div className="dashBoardContainer">
      <div className="title">DashBoard</div>
      <div className="content">
        <div className="graph">
          <div>
            <OrderStatusChart />
          </div>
          <div>
            <RevenueChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardShipper;
