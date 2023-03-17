const routeServer = {
  home: "/home",
  allProductShop: "/product/shop",
  allProductSale: "/product/sale",
  allProductNew: "/product/new",

  payment: "/home/payment",
  cart: "/home/cart",

  feedback: "/home/feedback",
  contact: "/home/contact",

  about: "/home/about",
  aboutPrivacyPolicy: "/home/about/privacyPolicy",
  aboutReturnPolicy: "/home/about/returnPolicy",
  aboutTermsService: "/home/about/TermsService",

  accountInfor: "/account/infor",
  accountEdit: "/account/edit",

  orderDetail: "/order/:id",
  viewOrder: "/vieworder",

  //user
  listuser: "/admin/user",
  newuser: "/admin/user/newuser",
  edituser: "/admin/user/edituser/:id",

  //Product
  listproduct: "/admin/product",
  singleproduct: "/admin/product/:id",
  newproduct: "/admin/product/newproduct",
  editproduct: "/admin/product/editproduct/:id",
  detailproduct: "/product/detail/:id",

  //category
  listcategory: "/admin/category",
  newcategory: "/admin/category/newcategory",
  editcategory: "/admin/category/editcategory/:id",
  //order
  listorder: "/admin/order",
  pendingOrder: "/admin/pendingOrder",
  singlePendingOrder: "/admin/pendingOrder/:id",

  singleorder: "/admin/order/:id",
  //Slider
  listslider: "/admin/slider",
  newslider: "/admin/slider/newslider",
  editslider: "/admin/slider/editslider/:id",
  //feedback
  listfeedback: "/admin/feedback",
  //discount
  listdiscount: "/admin/discount",
  newdiscount: "/admin/discount/newdiscount",
  editdiscount: "/admin/discount/editdiscount/:id",

  singleprofile: "/admin/profile",
  //   editprofile: "/admin/profile/editprofile",
  //register
  register: "/register",
  signin: "/sign-in",
  forgetPassword: "/forgetPassword",
  veryfyEmail: "veryfyEmail",
};

export default routeServer;
