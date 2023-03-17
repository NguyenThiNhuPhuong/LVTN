const routeClient = {
  home: "/",

  allProductShop: "/product/shop",
  allProductSale: "/product/sale",
  allProductNew: "/product/new",

  detailProduct: "/product/:id",
  payment: "/payment",
  cart: "/cart",

  feedback: "/feedback",
  contact: "/contact",

  about: "/about",
  aboutPrivacyPolicy: "/about/privacyPolicy",
  aboutReturnPolicy: "/about/returnPolicy",
  aboutTermsService: "/about/TermsService",

  accountInfo: "/account/info",
  accountEdit: "/account/edit",

  orderDetail: "/order/:id",
  viewOrder: "/viewOrder",

  userLogin: "/user/login",
  userRegister: "/user/register",
  userForgetPassword: "/user/forgetPassword",
  userVerifyEmail: "/user/verifyEmail",

  pageNotFound: "*",
};

export default routeClient;
