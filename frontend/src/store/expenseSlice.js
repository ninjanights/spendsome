import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allExpense: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAllExpense: (state, action) => {
      state.allExpense = action.payload;
    },
    addExpense: (state, action) => {
      state.allExpense.unshift(action.payload);
    },
  },
});

export const { setLoading, setError, setAllExpense, addExpense } =
  expenseSlice.actions;

export default expenseSlice.reducer;
