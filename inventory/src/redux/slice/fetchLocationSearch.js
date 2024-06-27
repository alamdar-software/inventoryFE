import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


export const fetchlocationsearch = createAsyncThunk(
  "fetchlocationSearch",
  async (accessToken) => {
    const response = await fetch("http://localhost:8080/location/search", {
        method:"POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body:{}
    });
    return response.json();
  }
);

const locationSLice = createSlice({
  name: "locationSearch",
  initialState: {
    loading: false,
    data: null,
    error: false,
  },
  //returned data is in action.payload
  extraReducers: (builder) => {
    builder.addCase(fetchlocationsearch.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchlocationsearch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchlocationsearch.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    
  },
});
export default locationSLice.reducer;
