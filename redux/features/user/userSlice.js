import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEmail: "",
  userToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userEmail = action.payload.email;
      state.userToken = action.payload.token;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
