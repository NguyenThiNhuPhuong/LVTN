import axios from "axios";
import Swal from "sweetalert2";
import httpRequest from "~/httpRequest/httpRequest";

export const signUpRegister = async ({
  fullName,
  email,
  phoneNumber,
  password,
  address,
  role = "user",
}) => {
  try {
    const res = await httpRequest.post(`auth/signUp`, {
      fullName,
      email,
      phoneNumber,
      password,
      address,
      role,
    });
    return res.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: `${error.response.data.message} 🙌👀`,
    });
  }
};
export const signInRegister = async ({ email, password }) => {
  try {
    const res = await axios
      .create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .post(`auth/signIn`, { email, password });
    return res;
  } catch (error) {
    if (error.response.data.message === "Login failed") {
      return await Swal.fire({
        icon: "error",
        text: "Tài khoản này cần xác thực mail😰😰",
        timer: 4000,
      });
    } else {
      await Swal.fire({
        icon: "error",
        text: "Email hoặc mật khẩu chưa chính xác😰😰",
        timer: 4000,
      });
    }
  }
};

export const LoginRegister = async (accessToken) => {
  try {
    const res = await axios
      .create({
        baseURL: process.env.REACT_APP_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .get(`auth/secret`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getRegister = async () => {
  try {
    const res = await httpRequest.get(`auth/secret`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const veryfyEmail = async (email, otp) => {
  try {
    const res = await httpRequest.post(`auth/verify-email`, { email, otp });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const veryfyForgetPassword = async (email, otp) => {
  try {
    const res = await httpRequest.post(`auth/verify-forgot-password`, {
      email,
      otp,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const forgetPassword = async (email) => {
  try {
    const res = await httpRequest.post(`auth/forgot-password`, { email });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateRegister = async (
  id,
  fullName,
  email,
  phoneNumber,
  password,
  address,
  role,
  active
) => {
  try {
    const res = await httpRequest.post(`user/update`, {
      id,
      fullName,
      email,
      phoneNumber,
      password,
      address,
      role,
      active,
    });
    return res;
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: "Email này đã tồn tại  🙌👀",
    });
  }
};
export const getARegister = async (id) => {
  try {
    const res = await httpRequest.get(`/user/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
