import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    user: null,  // user object containing user ID, email, and other data
  },
  reducers: {
    setLogin: (state, action) => {
      let { loginSt, loginUser } = action.payload;
      state.isLogin = loginSt;
      state.user = loginUser;  // Assume loginUser contains id, email, etc.
    },
  },
});

// actions export
export const authActions = authSlice.actions;

// reducer export
export const authReducer = authSlice.reducer;
