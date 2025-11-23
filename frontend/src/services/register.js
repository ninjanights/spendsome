import {
  loginApi,
  signupUserApi,
  verifyOtpApi,
  logoutApi,
} from "../axios/axios.js";

// post, signup helper.
export const signupH = async (form) => {
  try {
    const { username, email, password } = form;

    console.log(username, email, "kkkkk");
    if (!username || !email || !password) {
      return { success: false, message: "Some credentials are invalid." };
    }

    const res = await signupUserApi(form);
    return { data: res.data };
  } catch (e) {
    console.log("Log in error from helper.", e.message);
    return {
      success: false,
      message: e.response?.data?.message || e.message,
    };
  }
};

// verify otp.
export const verifyOtpH = async (email, otp) => {
  try {
    if (!email || !otp) {
      return { success: false, message: "You're not sending any otp." };
    }

    console.log(email, otp, "44444");
    const res = await verifyOtpApi({ email: email, otp: otp });

    return { data: res.data };
  } catch (e) {
    console.log("Verify otp error from helper.", e.message);
    return {
      success: false,
      message: e.response?.data?.message || e.message,
    };
  }
};

// login h.
export const loginH = async (email, password) => {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "You're not sending any email or password.",
      };
    }

    const res = await loginApi({ email: email, password: password });
    return {
      success: res.data.success || false,
      message: res.data.message,
      data: res.data,
    };
  } catch (e) {
    console.log("Login error from helper.", e.message);
    return {
      success: false,
      message: e.response?.data?.message || e.message,
    };
  }
};

// log out h.
export const logoutH = async () => {
  try {
    const res = await logoutApi();
    return res;
  } catch (e) {
    console.log("Logout error.", e.message);
    return {
      success: false,
      message: e.response?.data?.message || e.message,
    };
  }
};
