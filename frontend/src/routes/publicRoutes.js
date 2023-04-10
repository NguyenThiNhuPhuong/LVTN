import routeClient from "~/config/routeClient";
import PageNotFound from "~/customer/layouts/component/pageNotFound/PageNotFound";
import DefaultLayout from "~/customer/layouts/defaultLayout";
import LayoutNoSlider from "~/customer/layouts/layoutNoSlider";

import PrivacyPolicy from "~/customer/modules/About/page/PrivacyPolicy/PrivacyPolicy";
import ReturnPolicy from "~/customer/modules/About/page/ReturnPolicy/ReturnPolicy";
import TermsService from "~/customer/modules/About/page/TermsService/TermsService";
import About from "~/customer/modules/About/page/about/About";
import Login from "~/customer/modules/Auth/page/login/Login";
import Register from "~/customer/modules/Auth/page/register/Register";
import Cart from "~/customer/modules/Cart/page/Cart";
import Contact from "~/customer/modules/Contact/page/Contact";
import PageDetailProduct from "~/customer/modules/Home/page/PageDetailProduct/PageDetailProduct";
import Home from "~/customer/modules/Home/page/PageShop/Home";
import Payment from "~/customer/modules/Payment/page/Payment";

const PUBLIC_ROUTES = [
  { path: routeClient.home, component: Home, layout: DefaultLayout },
  { path: routeClient.cart, component: Cart, layout: LayoutNoSlider },

  { path: routeClient.allProductShop, component: Home, layout: DefaultLayout },
  {
    path: routeClient.userRegister,
    component: Register,
    layout: LayoutNoSlider,
  },
  {
    path: routeClient.userLogin,
    component: Login,
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
  {
    path: routeClient.aboutPrivacyPolicy,
    component: PrivacyPolicy,
    layout: LayoutNoSlider,
  },
  {
    path: routeClient.aboutReturnPolicy,
    component: ReturnPolicy,
    layout: LayoutNoSlider,
  },
  {
    path: routeClient.aboutTermsService,
    component: TermsService,
    layout: LayoutNoSlider,
  },
  { path: routeClient.contact, component: Contact, layout: LayoutNoSlider },

  { path: routeClient.payment, component: Payment, layout: LayoutNoSlider },
];
export default PUBLIC_ROUTES;
