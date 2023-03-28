import routeClient from "~/config/routeClient";
import PageNotFound from "~/layouts/component/pageNotFound/PageNotFound";
import DefaultLayout from "~/layouts/defaultLayout";
import LayoutNoSlider from "~/layouts/layoutNoSlider";
import About from "~/modules/About/page/about/About";
import Register from "~/modules/Auth/page/register/Register";
import Cart from "~/modules/Cart/page/Cart";
import PageDetailProduct from "~/modules/Home/page/PageDetailProduct/PageDetailProduct";
import Home from "~/modules/Home/page/PageShop/Home";

const PUBLICROUTES = [
  { path: routeClient.home, component: Home, layout: DefaultLayout },
  { path: routeClient.cart, component: Cart, layout: LayoutNoSlider },

  { path: routeClient.allProductShop, component: Home, layout: DefaultLayout },
  {
    path: routeClient.userRegister,
    component: Register,
    layout: LayoutNoSlider,
  },
  {
    path: routeClient.detailProduct,
    component: PageDetailProduct,
    layout: LayoutNoSlider,
  },
  {
    path: routeClient.pageNotFound,
    component: PageNotFound,
    layout: LayoutNoSlider,
  },
  { path: routeClient.about, component: About, layout: LayoutNoSlider },
];
export default PUBLICROUTES;
