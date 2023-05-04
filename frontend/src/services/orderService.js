import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";
//--------------------------ADMIN---------------------

//LIST ORDER ALL STATUS FOR ADMIN
export const getListOrder = async (status_id) => {
  try {
    const res = await httpRequest.get(
      status_id === 0 ? `orders` : `orders?status_id=${status_id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
//CREATE ORDER FOR ADMIN
export const newOrder = async (values) => {
  try {
    const res = await httpRequest.post(`orders`, values);
    return res.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: `${error.response.data.message} 🙌👀`,
    });
  }
};
//GET A ORDER FOR ADMIN
export const getAOrder = async (id) => {
  try {
    const res = await httpRequest.get(`orders/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// ---------------------SHIPPER-----------------

//LIST ORDER PENDING FO SHIPPER
export const listPendingOrder = async () => {
  try {
    const res = await httpRequest.get(`order/listPendingOrder`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//LIST ORDER DELIVERY FOR SHIPPER
export const deliveryOrder = async (order_id) => {
  try {
    const res = await httpRequest.post(`order/receivedOrder`, { order_id });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//----------------------------ADMIN && SHIPPER---------------------

//UPDATE STATUS ORDER FOR ADMIN AND SHIPPER
export const updateStatusOrder = async ({ id, order_status_id }) => {
  try {
    const res = await httpRequest.post(`orders/status/${id}`, order_status_id);
    return res;
  } catch (error) {
    await Swal.fire({
      icon: "error",
      text: "Bạn phải chọn đúng qui trình😰😰",
      timer: 4000,
    });
  }
};
