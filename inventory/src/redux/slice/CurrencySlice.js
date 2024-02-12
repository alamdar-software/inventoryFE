import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchCurrency = createAsyncThunk(
  "fetchCurrency",
  async (accessToken) => {
    const res = await fetch("http://localhost:8080/currency/view", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  }
);

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCurrency.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchCurrency.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default currencySlice.reducer;
