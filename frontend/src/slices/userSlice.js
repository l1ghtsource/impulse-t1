import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("user"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
    },
    login(state, action) {
      const { login, password } = action.payload;
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser.login === login && storedUser.password === password) {
        state.isLoggedIn = true;
        state.user = storedUser;
        state.error = null;
      } else {
        state.error = "Неверный логин или пароль";
      }
    },
    register(state, action) {
      const { login, password, avatar, email } = action.payload;
      const newUser = { login, password, avatar, email };

      localStorage.setItem("user", JSON.stringify(newUser));
      state.isLoggedIn = true;
      state.user = newUser;
      state.error = null;
    },
  },
});

export const { setUser, logout, loginUser, registerUser } = userSlice.actions;
export default userSlice.reducer;
