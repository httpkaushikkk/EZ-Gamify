import { createSlice } from "@reduxjs/toolkit";

export interface LoaderState {
  value: boolean;
}

const initialState: LoaderState = {
  value: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.value = true;
    },
    hideLoader: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
