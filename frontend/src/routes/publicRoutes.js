import routeClient from "~/config/routeClient";
import PageNotFound from "~/layouts/component/pageNotFound/PageNotFound";
import DefaultLayout from "~/layouts/defaultLayout";
import LayoutNoSlider from "~/layouts/layoutNoSlider";
import About from "~/modules/About/page/about/About";
import PrivacyPolicy from "~/modules/About/page/PrivacyPolicy/PrivacyPolicy";
import ReturnPolicy from "~/modules/About/page/ReturnPolicy/ReturnPolicy";
import TermsService from "~/modules/About/page/TermsService/TermsService";
import Register from "~/modules/Auth/page/register/Register";
import Cart from "~/modules/Cart/page/Cart";
import Contact from "~/modules/Contact/page/Contact";
import PageDetailProduct from "~/modules/Home/page/PageDetailProduct/PageDetailProduct";
import Home from "~/modules/Home/page/PageShop/Home";
import Payment from "~/modules/Payment/page/Payment";

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
export default PUBLICROUTES;
