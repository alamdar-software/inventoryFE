import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchCategory = createAsyncThunk(
  "fetchCategory",
  async (accessToken) => {
    const res = await fetch("http://localhost:8080/category/view", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  }
);

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
