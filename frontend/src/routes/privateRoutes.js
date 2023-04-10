import DefaultLayoutAdmin from "~/admin/layouts/defaultLayoutAdmin";
import DashBoard from "~/admin/modules/dashboard/pages/DashBoard";
import ListProduct from "~/admin/modules/products/pages/listProduct/ListProduct";
import NewProduct from "~/admin/modules/products/pages/newProduct/NewProduct";
import routeServer from "~/config/routeServer";

const PRIVATE_ROUTES = [
  {
    path: routeServer.listProduct,
    component: ListProduct,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.newProduct,
    component: NewProduct,
    layoutOne: DefaultLayoutAdmin,
  },
];
export default PRIVATE_ROUTES;
