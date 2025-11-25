import { addExpApi, getAllExpApi } from "../axios/axios.js";

// add 1 exp h.
export const addExpH = async (form) => {
  try {
    const { title, amount, category } = form;
    if (!title || !amount || !category) {
      return {
        success: false,
        message: "Some expense details are required.",
        data: null,
      };
    }

    const res = await addExpApi(form);
    return {
      success: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (e) {
    console.log("Error sending expense details in helper.", e.message);
    return {
      success: false,
      message: e.response?.data?.message || e.message,
    };
  }
};

// get all exps.
export const getAllExpH = async () => {
  try {
    const res = await getAllExpApi();
    return {
      success: res.data.success,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (e) {
    console.log("Error in getting all expenses of you.", e.message);
    return {
      success: false,
      message: e.response?.data?.message || e.message,
    };
  }
};
