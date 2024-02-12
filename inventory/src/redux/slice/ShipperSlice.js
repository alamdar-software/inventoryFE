import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchShipper = createAsyncThunk(
  "fetchShipper",
  async (accessToken) => {
    const res = await fetch("http://localhost:8080/shipper/view", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  }
);

const shipperSlice = createSlice({
  name: "shipper",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShipper.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchShipper.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchShipper.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default shipperSlice.reducer;
