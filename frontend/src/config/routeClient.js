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
  aboutTermsService: "/about/termsService",

  accountInfo: "/account/info",
  accountEdit: "/account/edit",

  orderDetail: "/viewOrder/user/:id",
  viewOrder: "/viewOrder",

  userLogin: "/login",
  userRegister: "/register",
  userForgetPassword: "/forgetPassword",
  userVerifyEmail: "/verifyEmail",

  pageNotFound: "*",
};

export default routeClient;
