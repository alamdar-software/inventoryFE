import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchIncome = createAsyncThunk("fetchIncome", async () => {
  const res = await fetch("http://localhost:8080/incomingstock/view");
  return res.json();
});

const incomingStock = createSlice({
  name: "singleIncome",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIncome.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchIncome.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchIncome.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default incomingStock.reducer;
