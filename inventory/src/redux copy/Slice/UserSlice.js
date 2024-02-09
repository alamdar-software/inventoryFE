import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  Loading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.Loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.Loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.Loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.Loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = false;
      state.Loading = false;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.Loading = false;
    },
    deleteStart: (state) => {
      state.Loading = true;
      state.error = null;
    },
    deleteSuccess: (state, action) => {
      state.currentUser = null;
      state.error = false;
      state.Loading = false;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.Loading = false;
    },
    signoutStart: (state) => {
      state.Loading = true;
      state.error = null;
    },
    signoutSuccess: (state, action) => {
      state.currentUser = null;
      state.error = false;
      state.Loading = false;
    },
    signoutFailure: (state, action) => {
      state.error = action.payload;
      state.Loading = false;
    },
  },
});
export const {
  signinStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteSuccess,
  deleteStart,
  deleteFailure,
  signoutStart,
  signoutSuccess,
  signoutFailure,
} = UserSlice.actions;
export default UserSlice.reducer;
