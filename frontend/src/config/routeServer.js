const routeServer = {
  dashboard: "/admin/dashboard",
  //user
  listUser: "/admin/user",
  newUser: "/admin/user/newUser",
  editUser: "/admin/user/edituser/:id",

  //Product
  listProduct: "/admin/product",
  singleProduct: "/admin/product/:id",
  newProduct: "/admin/product/newProduct",
  editProduct: "/admin/product/editProduct/:id",
  detailProduct: "/product/detail/:id",

  //category
  listCategory: "/admin/category",
  newCategory: "/admin/category/newCategory",
  editCategory: "/admin/category/editCategory/:id",

  //order
  listOrder: "/admin/order",
  pendingOrder: "/admin/pendingOrder",
  singlePendingOrder: "/admin/pendingOrder/:id",
  singleOrder: "/admin/order/detailOrder",

  //Slider
  listSlider: "/admin/slider",
  newSlider: "/admin/slider/newSlider",
  editSlider: "/admin/slider/editSlider/:id",

  //feedback
  listFeedback: "/admin/feedback",

  //discount
  listDiscount: "/admin/discount",
  newDiscount: "/admin/discount/newDiscount",
  editDiscount: "/admin/discount/editDiscount/:id",

  //
  singleProfile: "/admin/profile",
};

export default routeServer;
