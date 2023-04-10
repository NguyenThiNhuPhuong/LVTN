const routeServer = {
  //user
  listuser: "/admin/user",
  newuser: "/admin/user/newuser",
  edituser: "/admin/user/edituser/:id",

  //Product
  listProduct: "/admin/product",
  singleProduct: "/admin/product/:id",
  newProduct: "/admin/product/newproduct",
  editProduct: "/admin/product/editproduct/:id",
  detailProduct: "/product/detail/:id",

  //category
  listCategory: "/admin/category",
  newCategory: "/admin/category/newcategory",
  editCategory: "/admin/category/editcategory/:id",

  //order
  listOrder: "/admin/order",
  pendingOrder: "/admin/pendingOrder",
  singlePendingOrder: "/admin/pendingOrder/:id",
  singleOrder: "/admin/order/:id",

  //Slider
  listSlider: "/admin/slider",
  newSlider: "/admin/slider/newslider",
  editSlider: "/admin/slider/editslider/:id",

  //feedback
  listFeedback: "/admin/feedback",

  //discount
  listDiscount: "/admin/discount",
  newDiscount: "/admin/discount/newdiscount",
  editDiscount: "/admin/discount/editdiscount/:id",

  //
  singleProfile: "/admin/profile",
};

export default routeServer;
