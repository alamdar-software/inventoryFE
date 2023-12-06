import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
  const res = await fetch("http://localhost:8080/category/view");
  return res.json();
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default categorySlice.reducer;
