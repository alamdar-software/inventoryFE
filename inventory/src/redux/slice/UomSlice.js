import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchUom = createAsyncThunk("Uom", async (accessToken) => {
  const res = await fetch("http://localhost:8080/unit/view", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.json();
});

const uomSlice = createSlice({
  name: "UOM",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUom.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchUom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUom.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default uomSlice.reducer;
