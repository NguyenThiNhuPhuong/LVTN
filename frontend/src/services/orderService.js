import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";
//waiting order list for confirmation
export const getListOrder = async () => {
  try {
    const res = await httpRequest.get(`orders`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//CREATE ORDER
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
//GET A ORDER
export const getAOrder = async (id) => {
  try {
    const res = await httpRequest.get(`orders/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const listPendingOrder = async () => {
  try {
    const res = await httpRequest.get(`order/listPendingOrder`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editOrder = async (id, status) => {
  try {
    const res = await httpRequest.post(`order/update`, { id, status });
    return res;
  } catch (error) {
    // await Swal.fire({
    //     icon: 'error',
    //     text: 'Bạn phải chọn đúng qui trình😰😰',
    //     timer:4000
    //   })
  }
};
export const cancelOrder = async (order_id) => {
  try {
    const res = await httpRequest.post(`order/cancel`, { order_id });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const receivedOrder = async (order_id) => {
  try {
    const res = await httpRequest.post(`order/receivedOrder`, { order_id });
    return res;
  } catch (error) {
    console.log(error);
  }
};
