import { signupUserApi } from "../axios/axios.js";

// post, signup helper.
export const signupH = async (form) => {
  try {
    const { username, email, password } = form;
    console.log(form, "🎏");
    if (!username || !email || !password) {
      return { success: false, message: "Some credentials are invalid." };
    }

    const res = await signupUserApi(form);
    return { success: true, data: res.data };
  } catch (e) {
    console.log("Log in error from helper.", e.message);
    return {
      success: false,
      message: e.response?.data?.message || e.message,
    };
  }
};
