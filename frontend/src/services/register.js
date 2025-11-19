import { signupUserApi, verifyOtpApi } from "../axios/axios.js";

// post, signup helper.
export const signupH = async (form) => {
  try {
    const { username, email, password } = form;
    console.log(form, "🎏");
    if (!username || !email || !password) {
      return { success: false, message: "Some credentials are invalid." };
    }

    const res = await signupUserApi(form);
    console.log(res, "🍁");
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
