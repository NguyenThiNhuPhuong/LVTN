import axios from "axios";
import Swal from "sweetalert2";
import * as httpRequest from "~/httpRequest/httpRequest";

//REGISTER
export const signUpUser = async ({
  name,
  email,
  password,
  confirmPassword,
  type = 2,
}) => {
  try {
    const res = await httpRequest.post(`auth/register`, {
      name,
      email,
      password,
      confirmPassword,
      type,
    });
    return res.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: `${error.response.data.message} 🙌👀`,
    });
  }
};
//LOGIN
export const signInUser = async ({ email, password }) => {
  try {
    const res = await axios
      .create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .post(`auth/login`, { email, password });
    return res;
  } catch (error) {
    console.log(error);
    if (error.response.data.error === "Please verify your email to login") {
      return await Swal.fire({
        icon: "error",
        text: "Tài khoản này cần xác thực mail😰😰",
        timer: 4000,
      });
    } else {
      Swal.fire(`${error.response.data.message}😥`);
    }
  }
};
//CHANGE PASSWORD
export const changePassword = async ({
  current_password,
  new_password,
  confirm_new_password,
}) => {
  try {
    const res = await httpRequest.put(`user/change-password`, {
      current_password,
      new_password,
      confirm_new_password,
    });
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};

export const sendEmail = async (email) => {
  try {
    const res = await httpRequest.postFormData(
      `user/password/send-email`,
      email
    );
    return res;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Email này đã tồn tại  🙌👀",
    });
  }
};
export const confirmPassword = async ({ email, code }) => {
  try {
    const res = await httpRequest.post(
      `user/password/confirm?email=${email}&code=${code}`
    );
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
export const resetPassword = async (form) => {
  try {
    const res = await httpRequest.postFormData(`user/password/reset`, form);
    return res;
  } catch (error) {
    Swal.fire(`${error.response.data.message}😥`);
  }
};
