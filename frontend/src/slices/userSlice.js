import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронные санки
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(
        "http://51.250.42.179:8000/api/config/login",
        credentials
      );
      // Если сервер не возвращает данные пользователя, берем их из credentials
      const user = { login: credentials.login };
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка авторизации");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await axios.post(
        "http://51.250.42.179:8000/api/config/register",
        data
      );
      // Если сервер не возвращает данные пользователя, берем их из data
      const user = { login: data.login, avatar: data.avatar || "" };
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка регистрации");
    }
  }
);

const initialState = {
  // isLoggedIn: !!localStorage.getItem("user"),
  isLoggedIn: true,
  user: JSON.parse(localStorage.getItem("user")) || 'user',
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
