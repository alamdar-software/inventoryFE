import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchConsignee = createAsyncThunk(
  "fetchConsignee",
  async (accessToken) => {
    const res = await fetch("http://localhost:8080/consignee/view", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  }
);

const consigneeSlice = createSlice({
  name: "consignee",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConsignee.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchConsignee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchConsignee.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default consigneeSlice.reducer;
