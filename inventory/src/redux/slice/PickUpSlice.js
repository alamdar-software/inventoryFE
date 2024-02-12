import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchPickup = createAsyncThunk("pickup", async (accessToken) => {
  const { currentUser } = useSelector((state) => state.persisted.user);
  const res = await fetch("http://localhost:8080/pickup/view", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
});
const pickupSlice = createSlice({
  name: "pickup",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPickup.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchPickup.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchPickup.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default pickupSlice.reducer;
