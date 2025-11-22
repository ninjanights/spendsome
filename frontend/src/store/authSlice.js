import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setAuthFromLStorage: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
    },
    logout: (state) => {
      localStorage.removeItem("auth");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout, setAuthFromLStorage } =
  authSlice.actions;
export default authSlice.reducer;
