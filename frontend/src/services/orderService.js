import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";
//--------------------------ADMIN---------------------

//LIST ORDER ALL STATUS FOR ADMIN AND SHIPPER
export const getListOrder = async ({ page, status_id }) => {
  try {
    let params = "";
    if (page !== undefined) {
      params += `page=${page}&`;
    }

    if (status_id !== "") {
      params += `status_id=${status_id}`;
    }
    const res = await httpRequest.get(`orders?per_page=12&${params}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//GET LIST ORDER FOR USER
export const getListOrderUser = async (id) => {
  try {
    const res = await httpRequest.get(`orders/user/${id}`);
    return res.data;
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
    console.log("iddddd", id);
    const res = await httpRequest.get(`orders/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//----------------------------ADMIN && SHIPPER---------------------

//UPDATE STATUS ORDER FOR ADMIN AND SHIPPER
export const updateStatusOrder = async ({ id, order_status_id }) => {
  try {
    const res = await httpRequest.put(`orders/status/${id}`, {
      order_status_id,
    });
    return res;
  } catch (error) {
    await Swal.fire({
      icon: "error",
      text: "Bạn phải chọn đúng qui trình😰😰",
      timer: 4000,
    });
  }
};
