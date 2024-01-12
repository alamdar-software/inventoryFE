import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchConsumeItem = createAsyncThunk("fetchConsume", async () => {
  const res = await fetch("http://localhost:8080/consumeditem/view");
  return res.json();
});

const ConsumeItemSlice = createSlice({
  name: "consumedSlice",
  initialState: {
    loading: false,
    error: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConsumeItem.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchConsumeItem.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.data = action.payload;
    });
    builder.addCase(fetchConsumeItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default ConsumeItemSlice.reducer;
