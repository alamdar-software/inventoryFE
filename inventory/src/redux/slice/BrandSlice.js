import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const fetchBrand = createAsyncThunk(
  'fetchBrand',
  async (accessToken) => {
    const res = await fetch('http://localhost:8080/brand/view', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.json();
  }
);

const BrandSlice = createSlice({
  name: 'Brand',
  initialState: {
    data: null,
    loading: false,
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    });
    builder.addCase(fetchBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrand.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
export default BrandSlice.reducer;
