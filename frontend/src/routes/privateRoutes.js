import DefaultLayoutAdmin from "~/admin/layouts/defaultLayoutAdmin";
import DashBoard from "~/admin/modules/dashboard/pages/DashBoard";
import ListOrder from "~/admin/modules/orders/pages/listOrder/ListOrder";
import OrderDetail from "~/admin/modules/orders/pages/orderDetail/OrderDetail";
import ListProduct from "~/admin/modules/products/pages/listProduct/ListProduct";
import NewProduct from "~/admin/modules/products/pages/newProduct/NewProduct";
import Profile from "~/admin/modules/profile/page/Profile/Profile";
import ListUser from "~/admin/modules/users/pages/listUsers/ListUser";
import routeServer from "~/config/routeServer";

const PRIVATE_ROUTES = [
  {
    path: routeServer.dashboard,
    component: DashBoard,
    layoutOne: DefaultLayoutAdmin,
  },
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
  {
    path: routeServer.listUser,
    component: ListUser,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.listOrder,
    component: ListOrder,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.singleOrder,
    component: OrderDetail,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.singleProfile,
    component: Profile,
    layoutOne: DefaultLayoutAdmin,
  },
];
export default PRIVATE_ROUTES;
