import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchItem = createAsyncThunk("fetchItem", async (accessToken) => {
  const res = await fetch("http://localhost:8080/item/view", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
});
const itemSlice = createSlice({
  name: "item",
  initialState: {
    loading: false,
    error: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.loading = true;

      state.error = action.payload;
    });
    builder.addCase(fetchItem.pending, (state, action) => {
      state.loading = false;
    });
  },
});

export default itemSlice.reducer;
