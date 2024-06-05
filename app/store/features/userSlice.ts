import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  permission: any;
}

const initialState: CounterState = {
  permission: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action) => {
      state.permission = action.payload;
    },
    remove: (state) => {
      state.permission = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove } = userSlice.actions;

export default userSlice.reducer;
