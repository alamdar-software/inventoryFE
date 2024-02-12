import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchentity = createAsyncThunk(
  "fetchentity",
  async (accessToken) => {
    const res = await fetch("http://localhost:8080/entity/view", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  }
);

const entitySlice = createSlice({
  name: "entity",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchentity.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchentity.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchentity.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default entitySlice.reducer;
