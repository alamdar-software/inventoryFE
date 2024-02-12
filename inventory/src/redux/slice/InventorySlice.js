import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchInventory = createAsyncThunk(
  "fetchInventory",
  async (accessToken) => {
    const res = await fetch("http://localhost:8080/inventory/view", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  }
);

const inventorySlice = createSlice({
  name: "fetchInventory",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchInventory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default inventorySlice.reducer;
