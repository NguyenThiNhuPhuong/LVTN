import DefaultLayoutAdmin from "~/admin/layouts/defaultLayoutAdmin";
import DashBoard from "~/admin/modules/dashboard/pages/DashBoard";

const { default: routeServer } = require("~/config/routeServer");

const PRIVATEROUTES = [
  {
    path: routeServer.listProduct,
    component: DashBoard,
    layout: DefaultLayoutAdmin,
  },
];
export default PRIVATEROUTES;
