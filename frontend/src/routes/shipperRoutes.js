import routeShipper from "~/config/routeShipper";
import defaultLayoutShipper from "~/shipper/layouts/defaultLayoutShipper/defaultLayoutShipper";
import DashBoardShipper from "~/shipper/modules/DashBoard/DashBoardShipper";
import DeliveryOrders from "~/shipper/modules/DeliveryOrders/DeliveryOrders";
import PendingOrders from "~/shipper/modules/PendingOrders/PendingOrders";
import ProfileShipper from "~/shipper/modules/ProfileShipper/ProfileShipper";

const SHIPPER_ROUTES = [
  {
    path: routeShipper.dashboard,
    component: DashBoardShipper,
    layoutOne: defaultLayoutShipper,
  },
  {
    path: routeShipper.pendingOrders,
    component: PendingOrders,
    layoutOne: defaultLayoutShipper,
  },
  {
    path: routeShipper.deliveryOrders,
    component: DeliveryOrders,
    layoutOne: defaultLayoutShipper,
  },
  {
    path: routeShipper.profileShipper,
    component: ProfileShipper,
    layoutOne: defaultLayoutShipper,
  },
];
export default SHIPPER_ROUTES;
