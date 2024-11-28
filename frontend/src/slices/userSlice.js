import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true, // Изначально пользователь не авторизован
  user: null, // Информация о пользователе
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
