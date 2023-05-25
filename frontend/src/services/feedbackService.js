import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";

//API GET LIST FEEDBACK
export const getFeedback = async ({ page }) => {
  let params = "";
  if (page !== undefined) {
    params += `page=${page}&`;
  }
  try {
    const res = await httpRequest.get(`feedback?per_page=12&${params}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//API PUT POST FEEDBACK
export const postFeedback = async ({ email, content }) => {
  try {
    const res = await httpRequest.post(`feedback`, { email, content });
    return res;
  } catch (error) {
    console.log(error);
  }
};
