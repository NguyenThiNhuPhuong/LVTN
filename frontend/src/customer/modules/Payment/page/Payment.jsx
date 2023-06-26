import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import "./Payment.scss";

import { ToastContainer, toast } from "react-toastify";
import {
  resetCart,
  totalAllCart,
  totalCart,
} from "~/redux/slice/cart/CartSlice";
import { listDiscountValid } from "~/redux/slice/discount/DiscountSlice";
import Login from "../../Auth/page/login/Login";
import Form from "../component/Form/Form";
import TotalMoney from "../component/TotalMoney/TotalMoney";
import Discount from "../component/discount/Discount";
import DiscountInput from "../component/discountInput/DiscountInput";
import Header from "../component/header/Header";
import Product from "../component/product/Product";
import { resetIsSuccess, setNewOrder } from "~/redux/slice/order/OrderSlice";
import { getUserProfile } from "~/redux/slice/user/UserSlice";
//----------------------get date
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
};
export default function Payment() {
  TabTitle("Thanh toán");
  //---------------------use selector
  const { priceCart, listCart, priceShip } = useSelector((state) => state.cart);
  const { discount, ListDiscountValid } = useSelector(
    (state) => state.discount
  );
  const { orderNew } = useSelector((state) => state.order);
  const { userProfile } = useSelector((state) => state.user);

  const { isSuccessNew } = useSelector((state) => state.order);
  const { token } = useSelector((state) => state.auth);
  //--------------------declare variable
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //--------------------handel when payment success
  useEffect(() => {
    if (isSuccessNew === true) {
      toast.success("Bạn đã thanh toán thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setTimeout(() => {
        navigate("/product/shop");
        dispatch(resetCart());
        dispatch(resetIsSuccess());
      }, 3000);
    }
  }, [isSuccessNew, dispatch, navigate]);
  //----------------------total cart
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(userProfile).length !== 0) {
      dispatch(
        setNewOrder({
          ...orderNew,
          name: userProfile.name,
          phone: userProfile.phone,
          email: userProfile.email,
          address: userProfile.address,
          province_id: userProfile.province_id,
          province_name: userProfile.province_name,
          district_id: userProfile.province_id,
          district_name: userProfile.district_name,
          ward_id: userProfile.ward_id,
          ward_name: userProfile.ward_name,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  console.log(orderNew);
  //----------------------call api check valid discount
  useEffect(() => {
    dispatch(
      listDiscountValid({
        date_time: getCurrentDateTime(),
        price_product: orderNew.price_product,
      })
    );
  }, [dispatch, orderNew.price_product, priceCart]);

  return token ? (
    <div className="PaymentContainer">
      <ToastContainer />
      <div className="row">
        <div className="main">
          <Header />
          <Form />
        </div>
        <div className="container">
          <div className="sidebar">
            <Product listCart={listCart ? listCart : []} />
            <Discount ListDiscountValid={ListDiscountValid} />
            <DiscountInput />
            <TotalMoney />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}
