import DefaultLayoutAdmin from "~/admin/layouts/defaultLayoutAdmin";
import SingleCategory from "~/admin/modules/category/pages/SingleCategory/SingleCategory";
import listCategory from "~/admin/modules/category/pages/listCategory/listCategory";
import NewCategory from "~/admin/modules/category/pages/newCategory/NewCategory";
import DashBoard from "~/admin/modules/dashboard/pages/DashBoard";
import ListDiscount from "~/admin/modules/discount/pages/ListDiscount/ListDiscount";
import NewDiscount from "~/admin/modules/discount/pages/NewDiscount/NewDiscount";
import SingleDiscount from "~/admin/modules/discount/pages/SingleDiscount/SingleDiscount";
import SingleOrder from "~/admin/modules/orders/pages/SingleOrder/SingleOrder";
import ListOrder from "~/admin/modules/orders/pages/listOrder/ListOrder";
import ListProduct from "~/admin/modules/products/pages/listProduct/ListProduct";
import NewProduct from "~/admin/modules/products/pages/newProduct/NewProduct";
import SingleProduct from "~/admin/modules/products/pages/singleProduct/SingleProduct";
import EditProfile from "~/admin/modules/profile/page/EditProfile/EditProfile";
import Profile from "~/admin/modules/profile/page/Profile/Profile";
import ListSlider from "~/admin/modules/slider/pages/ListSlider/ListSlider";
import NewSlider from "~/admin/modules/slider/pages/NewSlider/NewSlider";
import SingleSlider from "~/admin/modules/slider/pages/SingleSlider/SingleSlider";
import ListUser from "~/admin/modules/users/pages/listUsers/ListUser";
import NewUser from "~/admin/modules/users/pages/newUser/NewUser";
import SingleUser from "~/admin/modules/users/pages/singleUser/SingleUser";
import routeServer from "~/config/routeServer";

const PRIVATE_ROUTES = [
  //DASHBOARD
  {
    path: routeServer.dashboard,
    component: DashBoard,
    layoutOne: DefaultLayoutAdmin,
  },
  //PRODUCT
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
    path: routeServer.singleProduct,
    component: SingleProduct,
    layoutOne: DefaultLayoutAdmin,
  },
  //CATEGORY
  {
    path: routeServer.listCategory,
    component: listCategory,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.newCategory,
    component: NewCategory,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.Category,
    component: SingleCategory,
    layoutOne: DefaultLayoutAdmin,
  },
  //DISCOUNT
  {
    path: routeServer.listDiscount,
    component: ListDiscount,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.newDiscount,
    component: NewDiscount,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.editDiscount,
    component: SingleDiscount,
    layoutOne: DefaultLayoutAdmin,
  },
  //USER
  {
    path: routeServer.listUser,
    component: ListUser,
    layoutOne: DefaultLayoutAdmin,
  },

  {
    path: routeServer.newUser,
    component: NewUser,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.editUser,
    component: SingleUser,
    layoutOne: DefaultLayoutAdmin,
  },
  //PROFILE
  {
    path: routeServer.singleProfile,
    component: Profile,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.editProfile,
    component: EditProfile,
    layoutOne: DefaultLayoutAdmin,
  },
  //ORDER
  {
    path: routeServer.listOrder,
    component: ListOrder,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.singleOrder,
    component: SingleOrder,
    layoutOne: DefaultLayoutAdmin,
  },
  //SLIDER
  {
    path: routeServer.editSlider,
    component: SingleSlider,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.listSlider,
    component: ListSlider,
    layoutOne: DefaultLayoutAdmin,
  },
  {
    path: routeServer.newSlider,
    component: NewSlider,
    layoutOne: DefaultLayoutAdmin,
  },
];
export default PRIVATE_ROUTES;
